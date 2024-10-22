export function openModal(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keyup', closeModalbyEsc);
}

export function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keyup', closeModalbyEsc);
}

function closeModalbyEsc(event) {
  if (event.key === 'Escape') {
    const popup = document.querySelector('.popup_is-opened');
    closeModal(popup);
  }
}