'use strict';

(function () {
  // Открытие и закртыие окон с помощью клавиш


  const BUTTON_ESCAPE = 27;
  const BUTTON_ENTER = 13;

  const onButtonEscapeItem = (evt) => {
    if (evt.keyCode === BUTTON_ESCAPE) {
      window.preview.bigPicture.classList.add('hidden');
      document.querySelector('body').classList.remove('modal-open');

      window.picture.socialComments.textContent = '';
    }
  };

  const onButtonEnterItem = (evt) => {
    if (evt.target.className === 'picture') {
      const cardImgPreview = evt.target.querySelector('.picture__img');
      if (evt.keyCode === BUTTON_ENTER && cardImgPreview) {
        if (evt.keyCode === BUTTON_ENTER) {
          document.querySelector('body').classList.add('modal-open');
        }
      }
    }
  };

  const onButtonEscapeCancel = (evt) => {
    if (evt.keyCode === window.button.BUTTON_ESCAPE && document.activeElement !== window.validation.inputHashTags && document.activeElement !== window.validation.textAreaComment) {
      window.effects.closeEditWindow();
    }
  };

  window.button = {
    onButtonEscapeItem,
    onButtonEnterItem,
    BUTTON_ESCAPE: BUTTON_ESCAPE,
    onButtonEscapeCancel
  };

})();
