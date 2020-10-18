'use strict';

(function () {
  // Открытие и закртыие окон с помощью клавиш


  const BUTTON_ESCAPE = 27;
  const BUTTON_ENTER = 13;

  const onButtonEscapeItem = (evt) => {
    if (evt.keyCode === BUTTON_ESCAPE) {
      window.preview.bigPicture.classList.add('hidden');
      document.querySelector('body').classList.remove('modal-open');
    }
  };

  const onButtonEnterItem = (evt) => {
    if (evt.target.className === 'picture') {
      const cardImgPreview = evt.target.querySelector('.picture__img');
      if (evt.keyCode === BUTTON_ENTER && cardImgPreview) {
        // window.preview.bigPicture.classList.remove('hidden');
        // document.querySelector('body').classList.add('modal-open');
        window.preview.onItemOpen();
      }
    }
  };

  window.button = {
    onButtonEscapeItem,
    onButtonEnterItem,
    BUTTON_ESCAPE: BUTTON_ESCAPE,
  };

})();
