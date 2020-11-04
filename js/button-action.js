'use strict';

// Открытие и закртыие окон с помощью клавиш

const BUTTON_ESCAPE = 'Escape';
const BUTTON_ENTER = 'Enter';

const onButtonEscapeItem = (evt) => {
  if (evt.key === BUTTON_ESCAPE) {
    window.preview.bigPicture.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');

    window.picture.socialComments.textContent = '';
  }
};

const onButtonEnter = (evt, data) => {
  if (evt.target.className === 'picture') {
    const cardImgPreview = evt.target.querySelector('.picture');
    if (evt.key === BUTTON_ENTER && cardImgPreview) {
      const cardId = window.preview.indexPictureImage(cardImgPreview);
      const dataPost = data;
      window.preview.showBigPicture(dataPost, cardId);
      document.querySelector('body').classList.add('modal-open');
    }
  }
};

const onButtonEnterItem = (evt) => {
  onButtonEnter(evt, window.load.dataServerArr);
};

const onButtonFilterEnterItem = (evt) => {
  onButtonEnter(evt, window.filter.preparedPosts);
};

const onButtonEscapeCancel = (evt) => {
  if (evt.key === window.button.BUTTON_ESCAPE && document.activeElement !== window.validation.inputHashTags && document.activeElement !== window.validation.textAreaComment) {
    window.effects.closeEditWindow();
  }
};

window.button = {
  onButtonEscapeItem,
  onButtonEnterItem,
  onButtonFilterEnterItem,
  BUTTON_ESCAPE: BUTTON_ESCAPE,
  onButtonEscapeCancel
};
