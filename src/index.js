import '../src/index.css';
import { createCard, likeCard, deleteCard } from './components/card.js';
import {
  cardContainer,
  profileEditPopup,
  addCardPopup,
  profileImg,
  profileTitle,
  profileDescription,
  formAddCard,
  formEditProfile,
  popupImage,
  popupImageLink,
  popupImageName,
  formEditAvatar,
  changeAvatarPopup,
} from './components/constants.js';
import { openModal, closeModal } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import {
  getInitialCards,
  getProfileInfo,
  updateProfileInfo,
  addNewCard,
  editAvatar,
} from './components/api.js';

// Элементы для открытия попапов
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const avatarEditButton = document.querySelector('.profile__image');

// Функция открытия попапа с валидацией и сбросом ошибок
function openPopup(popup, callback) {
  callback();
  clearValidation(popup, validationConfig);
  openModal(popup);
}

// Открытие попапа редактирования профиля
function openEditProfilePopup() {
  formEditProfile.name.value = profileTitle.textContent;
  formEditProfile.description.value = profileDescription.textContent;
  openPopup(profileEditPopup, () => {});
}

// Открытие попапа добавления новой карточки
function openAddCardPopup() {
  formAddCard.reset();
  openPopup(addCardPopup, () => {});
}

// Открытие попапа изменения аватара
function openEditAvatarPopup() {
  formEditAvatar.reset();
  openPopup(changeAvatarPopup, () => {});
}

// Обработка отправки формы редактирования профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const name = formEditProfile.name.value;
  const job = formEditProfile.description.value;
  formEditProfile.save.textContent = 'Сохранение...';
  
  updateProfileInfo(name, job)
    .then(() => {
      profileTitle.textContent = name;
      profileDescription.textContent = job;
      closeModal(profileEditPopup);
    })
    .catch((err) => console.log(err))
    .finally(() => formEditProfile.save.textContent = 'Сохранить');
}

// Обработка отправки формы добавления новой карточки
function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const placeName = formAddCard['place-name'].value;
  const link = formAddCard.link.value;
  formAddCard.save.textContent = 'Сохранение...';
  
  addNewCard(placeName, link)
    .then((card) => {
      const cardInfo = buildCardInfo(card);
      const cardElement = createCard(cardInfo, profileOwner);
      cardContainer.prepend(cardElement);
      closeModal(addCardPopup);
    })
    .catch((err) => console.log(err))
    .finally(() => formAddCard.save.textContent = 'Создать');
}

// Обработка отправки формы изменения аватара
function handleEditAvatarFormSubmit(evt) {
  evt.preventDefault();
  const link = formEditAvatar.link.value;
  formEditAvatar.save.textContent = 'Сохранение...';
  
  editAvatar(link)
    .then((data) => {
      profileImg.style.backgroundImage = `url(${data.avatar})`;
      closeModal(changeAvatarPopup);
    })
    .catch((err) => console.log(err))
    .finally(() => formEditAvatar.save.textContent = 'Сохранить');
}

// Обработка клика на изображение карточки для открытия попапа
function handleImageClick(evt) {
  const img = evt.target;
  popupImageLink.src = img.src;
  popupImageLink.alt = img.alt;
  popupImageName.textContent = img.alt;
  openModal(popupImage);
}

// Функция сборки информации для карточки
function buildCardInfo(card) {
  return { card, likeCard, deleteCard, popupImageClick: handleImageClick };
}

// Инициализация карточек
function initializeCards(cards) {
  cards.forEach((card) => {
    const cardInfo = buildCardInfo(card);
    const cardElement = createCard(cardInfo, profileOwner);
    cardContainer.append(cardElement);
  });
}

// Инициализация профиля
function initializeProfile(profile) {
  profileTitle.textContent = profile.name;
  profileDescription.textContent = profile.about;
  profileImg.style.backgroundImage = `url(${profile.avatar})`;
}

// Загрузка данных с сервера
function fetchData() {
  Promise.all([getInitialCards(), getProfileInfo()])
    .then(([cards, profile]) => {
      initializeProfile(profile);
      profileOwner = profile;
      initializeCards(cards);
    })
    .catch((err) => console.log(err));
}

// Включение валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

// Слушатели событий для открытия попапов
editButton.addEventListener('click', openEditProfilePopup);
addButton.addEventListener('click', openAddCardPopup);
avatarEditButton.addEventListener('click', openEditAvatarPopup);

// Слушатели событий для отправки форм
formEditProfile.addEventListener('submit', handleProfileFormSubmit);
formAddCard.addEventListener('submit', handleAddCardFormSubmit);
formEditAvatar.addEventListener('submit', handleEditAvatarFormSubmit);

// Закрытие попапов при клике на оверлей или крестик
const popups = document.querySelectorAll('.popup');
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_is-opened') || evt.target.classList.contains('popup__close')) {
      closeModal(popup);
    }
  });
});

// Инициализация данных и валидации
fetchData();
enableValidation(validationConfig);
