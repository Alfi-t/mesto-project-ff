const cardTemplate = document.querySelector("#card-template").content.querySelector(".card");

// Функция обработки лайка
export function handleLikeCard(evt) {
  const likeButton = evt.currentTarget;
  likeButton.classList.toggle("card__like-button_is-active");

  console.log(likeButton.classList.contains("card__like-button_is-active") ? "Лайк установлен" : "Лайк снят");
}

// Функция обработки клика по изображению
export function handleImageClick(cardData, openPopup) {
  return () => {
    const popupImage = document.querySelector('.popup__image');
    const popupCaption = document.querySelector('.popup__caption');
    
    popupImage.src = cardData.link;
    popupImage.alt = cardData.name;
    popupCaption.textContent = cardData.name;

    const imagePopup = document.querySelector('.popup_type_image');
    openPopup(imagePopup);
  };
}

// Функция создания карточки
export function createCard(cardData, deleteCard, openPopup) {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector(".card__image").src = cardData.link;
  cardElement.querySelector(".card__title").textContent = cardData.name;
  cardElement.querySelector(".card__image").alt = cardData.name;

  const imageElement = cardElement.querySelector(".card__image");
  imageElement.addEventListener("click", handleImageClick(cardData, openPopup));

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
