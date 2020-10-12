'use strict';

(function () {
  const bigPicture = document.querySelector('.big-picture');
  const bigPictureImg = document.querySelector('.big-picture__img').querySelector('img');
  const bigPictureLikes = document.querySelector('.likes-count');
  const bigPictureComments = document.querySelector('.comments-count');
  const socialCaption = document.querySelector('.social__caption');
  const buttonPictureItems = document.querySelector('#picture-cancel');
  const pictureItems = document.querySelectorAll('.picture__img');

  // Функция для отображения

  const showBigPicture = () => {
    const picture = window.pictureArr.pictures[0];

    bigPictureImg.src = picture.url;
    bigPictureLikes.textContent = picture.likes;
    bigPictureComments.textContent = picture.comments.length;
    socialCaption.textContent = picture.description;
    window.picture.renderComments(picture.comments);
    bigPicture.classList.remove('hidden');

  };
  showBigPicture();

  // прячем счетчики комментариев

  const hiddenComment = () => {
    document.querySelector('.social__comment-count').classList.add('hidden');
    document.querySelector('.comments-loader').classList.add('hidden');
  };

  hiddenComment();

  // Добавил открытие/закрытие карточек

  const openItems = () => {
    for (let i = 0; i < pictureItems.length; i++) {
      pictureItems[i].addEventListener('click', function () {
        bigPicture.classList.remove('hidden');
        document.querySelector('body').classList.add('modal-open');
      });
    }
  };

  openItems();

  const closeItems = () => {
    buttonPictureItems.addEventListener('click', function () {
      bigPicture.classList.add('hidden');
      document.querySelector('body').classList.remove('modal-open');
    });
  };

  closeItems();

  window.preview = {
    bigPicture: bigPicture,
  };

})();
