'use strict';

(function () {
  const bigPicture = document.querySelector('.big-picture');
  const bigPictureImg = document.querySelector('.big-picture__img').querySelector('img');
  const bigPictureLikes = document.querySelector('.likes-count');
  const bigPictureComments = document.querySelector('.comments-count');
  const socialCaption = document.querySelector('.social__caption');
  const buttonPictureItems = document.querySelector('#picture-cancel');
  const pictures = document.querySelector('.pictures');

  // Функция для отображения

  const showBigPicture = (id) => {
    const picture = window.load.dataServerArr[id];

    bigPictureImg.src = picture.url;
    bigPictureLikes.textContent = picture.likes;
    bigPictureComments.textContent = picture.comments.length;
    socialCaption.textContent = picture.description;
    window.picture.renderComments(picture.comments);
    bigPicture.classList.remove('hidden');

  };

  const showFilterBigPictureClick = (id) => {
    const picture = window.filter.preparedPosts[id];

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
    const pictureList = pictures.querySelectorAll('.picture__img');
    return Array.from(pictureList).indexOf(picture);
  };

  const onItemOpen = (evt) => {
    window.picture.socialComments.textContent = '';

    const ChoosenPictureElement = evt.target.closest('.picture__img');
    if (ChoosenPictureElement) {
      const pictureId = indexPictureImage(ChoosenPictureElement);
      document.querySelector('body').classList.add('modal-open');

      showBigPicture(pictureId);
    }
  };

  const onFilterItemOpenClick = (evt) => {
    window.picture.socialComments.textContent = '';

    const ChoosenPictureElement = evt.target.closest('.picture__img');
    if (ChoosenPictureElement) {
      const pictureId = indexPictureImage(ChoosenPictureElement);
      document.querySelector('body').classList.add('modal-open');

      showFilterBigPictureClick(pictureId);
    }
  };

  const closeItems = () => {
    bigPicture.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');

    window.picture.socialComments.textContent = '';
  };

  window.preview = {
    bigPicture: bigPicture,
    onItemOpen: onItemOpen,
    closeItems: closeItems,
    buttonPictureItems: buttonPictureItems,
    onFilterItemOpenClick: onFilterItemOpenClick,
  };

})();
