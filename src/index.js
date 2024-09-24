import { initialCards } from '../scripts/cards.js'; // Импорт массива карточек
import './index.css'; // Импорт стилей
import { createCard, deleteCard } from './components/card.js'; // Импорт функций для работы с карточками
import { openModal, closeModal, closePopupOnOverlayClick } from './components/modal.js'; // Импорт функций для работы с попапами

// Проверка, что данные успешно импортированы
console.log(initialCards);

// Место, куда будут добавляться карточки
const placesList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content.querySelector(".card");

// Добавляем карточки на страницу
initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData, deleteCard, openModal);
  placesList.appendChild(cardElement);
});

// Функция открытия попапа редактирования профиля
function openEditProfilePopup() {
  const editPopup = document.querySelector('.popup_type_edit');
  const nameInput = editPopup.querySelector('.popup__input_type_name');
  const descriptionInput = editPopup.querySelector('.popup__input_type_description');

  nameInput.value = document.querySelector('.profile__title').textContent;
  descriptionInput.value = document.querySelector('.profile__description').textContent;

  openModal(editPopup);
}

// Обработчик клика по кнопке редактирования профиля
const editButton = document.querySelector('.profile__edit-button');
editButton.addEventListener('click', openEditProfilePopup);

// Находим форму редактирования в DOM
const formElement = document.querySelector('.popup_type_edit .popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');

// Обработчик «отправки» формы редактирования
function handleFormSubmit(evt) {
  evt.preventDefault();
  const name = nameInput.value;
  const job = jobInput.value;

  document.querySelector('.profile__title').textContent = name;
  document.querySelector('.profile__description').textContent = job;

  closeModal(formElement.closest('.popup'));
}

formElement.addEventListener('submit', handleFormSubmit);

// Функция открытия попапа для добавления новой карточки
function openAddCardPopup() {
  const newCardPopup = document.querySelector('.popup_type_new-card');
  newCardPopup.querySelector('.popup__form').reset();
  openModal(newCardPopup);
}

// Обработчик клика по кнопке добавления карточки
const addButton = document.querySelector('.profile__add-button');
addButton.addEventListener('click', openAddCardPopup);

// Находим форму добавления карточки в DOM
const newCardForm = document.querySelector('.popup_type_new-card .popup__form');

// Обработчик «отправки» формы добавления карточки
function handleNewCardSubmit(evt) {
  evt.preventDefault();
  const placeNameInput = newCardForm.querySelector('.popup__input_type_card-name');
  const linkInput = newCardForm.querySelector('.popup__input_type_url');

  const cardData = {
    name: placeNameInput.value,
    link: linkInput.value
  };

  const newCardElement = createCard(cardData, deleteCard, openModal);
  placesList.prepend(newCardElement);

  closeModal(newCardForm.closest('.popup'));
}

newCardForm.addEventListener('submit', handleNewCardSubmit);

// Добавляем слушатели на все крестики закрытия
const closeButtons = document.querySelectorAll('.popup__close');
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closeModal(popup));
});

// Закрытие попапа по клику на оверлей
const popups = document.querySelectorAll('.popup');
popups.forEach((popup) => {
  popup.addEventListener('click', closePopupOnOverlayClick);
});





