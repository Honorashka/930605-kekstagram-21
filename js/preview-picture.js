'use strict';

(function () {
  const bigPicture = document.querySelector('.big-picture');
  const bigPictureImg = document.querySelector('.big-picture__img').querySelector('img');
  const bigPictureLikes = document.querySelector('.likes-count');
  const bigPictureComments = document.querySelector('.comments-count');
  const socialCaption = document.querySelector('.social__caption');
  const buttonPictureItems = document.querySelector('#picture-cancel');
  // const pictureItems = document.querySelectorAll('.picture');
  const pictures = document.querySelector('.pictures');

  // Функция для отображения

  const showBigPicture = (index) => {
    const picture = window.get[index];

    bigPictureImg.src = picture.url;
    bigPictureLikes.textContent = picture.likes;
    bigPictureComments.textContent = picture.comments.length;
    socialCaption.textContent = picture.description;
    window.picture.renderComments(picture.comments);
    bigPicture.classList.remove('hidden');

  };

  // прячем счетчики комментариев

  const hiddenComment = () => {
    document.querySelector('.social__comment-count').classList.add('hidden');
    document.querySelector('.comments-loader').classList.add('hidden');
  };

  hiddenComment();


  const indexPictureImage = (picture) => {
    const pictureList = pictures.querySelectorAll('.picture');
    return Array.from(pictureList).indexOf(picture);
  };


  const onItemOpen = (evt) => {
    const ChoosenPictureElement = evt.target.closest('.picture');
    if (ChoosenPictureElement) {
      const pictureIndex = indexPictureImage(ChoosenPictureElement);
      document.querySelector('body').classList.add('modal-open');

      showBigPicture(pictureIndex);
    }
  };

  const closeItems = () => {
    bigPicture.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
  };

  window.preview = {
    bigPicture: bigPicture,
    bigPict: bigPictureImg,
    onItemOpen: onItemOpen,
    showBigPicture: showBigPicture,
    indexPictureImage: indexPictureImage,
    closeItems: closeItems,
    buttonPictureItems: buttonPictureItems,
  };

})();
