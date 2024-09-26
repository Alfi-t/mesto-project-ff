import { initialCards } from '../scripts/cards.js'; // Импорт массива карточек 
import './index.css'; // Импорт стилей 
import { createCard, deleteCard } from './components/card.js'; // Импорт функций для работы с карточками 
import { openModal, closeModal, closePopupOnOverlayClick } from './components/modal.js'; // Импорт функций для работы с попапами 

// Проверка, что данные успешно импортированы 
console.log(initialCards); 

// Место, куда будут добавляться карточки 
const placesList = document.querySelector(".places__list"); 
const cardTemplate = document.querySelector("#card-template").content.querySelector(".card"); 

// Элементы модальных окон, вынесенные в константы
const editPopup = document.querySelector('.popup_type_edit'); 
const newCardPopup = document.querySelector('.popup_type_new-card'); 
const imagePopup = document.querySelector('.popup_type_image'); 

// Поля для ввода в форме редактирования профиля
const nameInput = editPopup.querySelector('.popup__input_type_name'); 
const descriptionInput = editPopup.querySelector('.popup__input_type_description'); 
const formElement = editPopup.querySelector('.popup__form'); 

// Поля для ввода в форме добавления новой карточки
const newCardForm = newCardPopup.querySelector('.popup__form'); 
const placeNameInput = newCardForm.querySelector('.popup__input_type_card-name'); 
const linkInput = newCardForm.querySelector('.popup__input_type_url'); 

// Элементы блока профиля
const profileTitle = document.querySelector('.profile__title'); 
const profileDescription = document.querySelector('.profile__description'); 
const editButton = document.querySelector('.profile__edit-button'); 
const addButton = document.querySelector('.profile__add-button'); 

// Элементы для попапа изображения
const popupImage = imagePopup.querySelector('.popup__image'); 
const popupCaption = imagePopup.querySelector('.popup__caption'); 

// Добавляем карточки на страницу 
initialCards.forEach((cardData) => { 
  const cardElement = createCard(cardData, deleteCard, handleImageClick); // Передаем обработчик в функцию создания карточки
  placesList.appendChild(cardElement); 
}); 

// Функция открытия попапа редактирования профиля 
function openEditProfilePopup() { 
  nameInput.value = profileTitle.textContent; 
  descriptionInput.value = profileDescription.textContent; 
  openModal(editPopup); 
} 

// Обработчик клика по кнопке редактирования профиля 
editButton.addEventListener('click', openEditProfilePopup); 

// Обработчик «отправки» формы редактирования 
function handleFormSubmit(evt) { 
  evt.preventDefault(); 
  const name = nameInput.value; 
  const job = descriptionInput.value; 
  profileTitle.textContent = name; 
  profileDescription.textContent = job; 
  closeModal(editPopup); 
} 

formElement.addEventListener('submit', handleFormSubmit); 

// Функция обработки клика по изображению
function handleImageClick(cardData) {
  popupImage.src = cardData.link; 
  popupImage.alt = cardData.name; 
  popupCaption.textContent = cardData.name; 
  openModal(imagePopup); 
}

// Функция открытия попапа для добавления новой карточки 
function openAddCardPopup() { 
  newCardForm.reset(); 
  openModal(newCardPopup); 
} 

// Обработчик клика по кнопке добавления карточки 
addButton.addEventListener('click', openAddCardPopup); 

// Обработчик «отправки» формы добавления карточки 
function handleNewCardSubmit(evt) { 
  evt.preventDefault(); 
  const cardData = { 
    name: placeNameInput.value, 
    link: linkInput.value 
  }; 
  const newCardElement = createCard(cardData, deleteCard, handleImageClick); // Передаем обработчик в функцию создания карточки
  placesList.prepend(newCardElement); 
  closeModal(newCardPopup); 
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