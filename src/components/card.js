import { addLikeById, deleteCardById, removeLikeById } from './api';

export function deleteCard(cardId, cardElement) {
  deleteCardById(cardId)
    .then((res) => {
      cardElement.remove();
    })
    .catch((err) => {
      console.log(err);
    });
}

export function likeCard(cardId, buttonLike) {
  const card = buttonLike.closest('.places__item');
  const spanLike = card.querySelector('.card__like-counter');
  if (buttonLike.classList.contains('card__like-button_is-active')) {
    removeLikeById(cardId)
      .then((res) => {
        buttonLike.classList.toggle('card__like-button_is-active');
        updateLike(spanLike, res);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    addLikeById(cardId)
      .then((res) => {
        buttonLike.classList.toggle('card__like-button_is-active');
        updateLike(spanLike, res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

function updateLike(spanLike, card) {
  spanLike.textContent = card.likes.length > 0 ? card.likes.length : '';
}

export function createCard(cardInfo, profileOwner) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate
    .querySelector('.places__item')
    .cloneNode(true);

  cardElement.querySelector('.card__title').textContent = cardInfo.card.name;

  const cardImage = cardElement.querySelector('.card__image');
  cardImage.setAttribute('src', cardInfo.card.link);
  cardImage.setAttribute('alt', cardInfo.card.name);

  cardImage.addEventListener('click', cardInfo.popupImageClick);

  const buttonDelete = cardElement.querySelector('.card__delete-button');
  if (cardInfo.card.owner._id === profileOwner._id) {
    buttonDelete.addEventListener('click', () =>
      cardInfo.deleteCard(cardInfo.card._id, cardElement)
    );
  } else {buttonDelete.remove()}
  
  const buttonLike = cardElement.querySelector('.card__like-button');
  buttonLike.addEventListener('click', () =>
    cardInfo.likeCard(cardInfo.card._id, buttonLike)
  );

  const spanLike = cardElement.querySelector('.card__like-counter');
  updateLike(spanLike, cardInfo.card);

  const hasOwnerLike = cardInfo.card.likes.some(
    (like) => like._id == profileOwner._id
  );
  if (hasOwnerLike) {
    buttonLike.classList.toggle('card__like-button_is-active');
  }

  return cardElement;
}