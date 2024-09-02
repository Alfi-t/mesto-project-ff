// Темплейт карточки
    const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');

// Место, куда будут добавляться карточки
    const placesList = document.querySelector('.places__list');

// Функция создания карточки
    function createCard(cardData, deleteCard) {

// Клонируем темплейт карточки
    const cardElement = cardTemplate.cloneNode(true);

// Находим элементы внутри карточки и устанавливаем им значения
    cardElement.querySelector('.card__image').src = cardData.link;
    cardElement.querySelector('.card__title').textContent = cardData.name;
    cardElement.querySelector('.card__image').alt = cardData.name;

// Находим кнопку удаления и добавляем ей обработчик клика
    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => deleteCard(deleteButton));

// Возвращаем созданный элемент карточки
    return cardElement;
}

// Функция удаления карточки
    function deleteCard(button) {
    const card = button.closest('.card');
    if (card) {
        card.remove();
    }
}

// Добавляем карточки на страницу
    initialCards.forEach((cardData) => {
    const cardElement = createCard(cardData, deleteCard);
    placesList.appendChild(cardElement);
});


