'use strict';

const textAreaComment = document.querySelector('.text__description');
const uploadCancel = document.querySelector('#upload-cancel');
const uploadFile = document.querySelector('#upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');

// Открытие и закрытие окна редактирования фотографии + с помощью ESC

const openEditWindow = () => {
  uploadOverlay.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', onButtonEscapeCancel);
};

const closeEditWindow = () => {
  uploadOverlay.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  uploadFile.value = '';
  window.effects.imgUploadPreview.className = 'effects__preview--none';
};

uploadFile.addEventListener('change', openEditWindow);
uploadCancel.addEventListener('click', closeEditWindow);

const onButtonEscapeCancel = (evt) => {
  if (evt.keyCode === window.button.BUTTON_ESCAPE && document.activeElement !== window.validation.inputHashTags && document.activeElement !== textAreaComment) {
    closeEditWindow();
  }
};

window.picture.pictureNode.addEventListener('keydown', window.button.onButtonEnterItem);
window.picture.pictureNode.addEventListener('keydown', window.button.onButtonEscapeItem);
