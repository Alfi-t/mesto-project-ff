export function openModal(popup) {
    popup.classList.add('popup_is-opened');
    popup.classList.remove('popup_is-animated');
    document.addEventListener('keydown', handleEscClose);
  }
  
  export function closeModal(popup) {
    popup.classList.add('popup_is-animated');
    setTimeout(() => {
      popup.classList.remove('popup_is-opened');
    }, 300);
    document.removeEventListener('keydown', handleEscClose);
  }
  
  function handleEscClose(evt) {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_is-opened');
      if (openedPopup) {
        closeModal(openedPopup);
      }
    }
  }
  
  export function closePopupOnOverlayClick(evt) {
    if (evt.target.classList.contains('popup')) {
      closeModal(evt.target);
    }
  }
  