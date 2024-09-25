const cardTemplate = document.querySelector("#card-template").content.querySelector(".card"); 

// Функция обработки лайка 
export function handleLikeCard(evt) { 
  const likeButton = evt.currentTarget; 
  likeButton.classList.toggle("card__like-button_is-active"); 

  console.log(likeButton.classList.contains("card__like-button_is-active") ? "Лайк установлен" : "Лайк снят"); 
} 

// Функция создания карточки 
export function createCard(cardData, deleteCard, handleImageClick) { 
  const cardElement = cardTemplate.cloneNode(true); 
  const imageElement = cardElement.querySelector(".card__image"); 

  // Записываем ссылки и подписи в переменные
  imageElement.src = cardData.link; 
  imageElement.alt = cardData.name; 
  cardElement.querySelector(".card__title").textContent = cardData.name; 

  // Добавляем обработчик клика по изображению
  imageElement.addEventListener("click", () => handleImageClick(cardData)); 

  const deleteButton = cardElement.querySelector(".card__delete-button"); 
  deleteButton.addEventListener("click", () => deleteCard(deleteButton)); 

  const likeButton = cardElement.querySelector(".card__like-button"); 
  likeButton.addEventListener("click", handleLikeCard); 

  return cardElement; 
} 

// Функция удаления карточки 
export function deleteCard(button) { 
  const card = button.closest(".card"); 
  if (card) { 
    card.remove(); 
  } 
} 