'use strict';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = document.querySelector('.big-picture__img').querySelector('img');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureComments = bigPicture.querySelector('.comments-count');
const socialCaption = bigPicture.querySelector('.social__caption');
const buttonPictureItems = bigPicture.querySelector('#picture-cancel');
const pictures = document.querySelector('.pictures');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const socialComments = bigPicture.querySelector('.social__comments');

// Функция для отображения

const showBigPicture = (data, id) => {
  const picture = data[id];

  bigPictureImg.src = picture.url;
  bigPictureLikes.textContent = picture.likes;
  bigPictureComments.textContent = picture.comments.length;
  socialCaption.textContent = picture.description;
  window.picture.renderComments(picture.comments);
  bigPicture.classList.remove('hidden');

  commentsLoader.classList.remove('hidden');

  let commentsArray = [];
  commentsArray = picture.comments;

  const showComments = (quantity, elements) => {
    for (let i = 0; i < quantity; i++) {
      elements[i].classList.remove('hidden');
    }
  };

  const allComments = socialComments.querySelectorAll('.social__comment');
  let countShowComment = 5;

  const moreComments = (quantity, array, newArray) => {
    if (quantity < array.length) {
      showComments(quantity, newArray);
      commentsLoader.classList.remove('hidden');
    } else {
      showComments(array.length, newArray);
      commentsLoader.classList.add('hidden');
    }
  };

  moreComments(countShowComment, allComments, allComments);

  const moreLoadComments = () => {
    countShowComment = countShowComment + 5;
    moreComments(countShowComment, commentsArray, allComments);
  };

  commentsLoader.addEventListener('click', moreLoadComments);

};

// прячем счетчики комментариев

const hiddenComment = () => {
  document.querySelector('.social__comment-count').classList.add('hidden');
};

hiddenComment();


const indexPictureImage = (picture) => {
  const pictureList = pictures.querySelectorAll('.picture');
  return Array.from(pictureList).indexOf(picture);
};

const onItemOpen = (evt) => {
  window.picture.socialComments.textContent = '';
  window.preview.buttonPictureItems.addEventListener('click', closeItems);
  window.picture.pictureNode.addEventListener('keydown', window.button.onButtonEscapeItem);
  window.picture.pictureNode.removeEventListener('keydown', window.button.onButtonEnterItem);

  const ChoosenPictureElement = evt.target.closest('.picture');

  if (ChoosenPictureElement) {
    const pictureId = indexPictureImage(ChoosenPictureElement);
    document.querySelector('body').classList.add('modal-open');

    const dataPost = window.load.dataServerArr;

    showBigPicture(dataPost, pictureId);

  }
};

const onFilterItemOpenClick = (evt) => {
  window.picture.socialComments.textContent = '';

  window.preview.buttonPictureItems.addEventListener('click', closeItems);
  window.picture.pictureNode.addEventListener('keydown', window.button.onButtonEscapeItem);
  window.picture.pictureNode.removeEventListener('keydown', window.button.onButtonEnterItem);

  const ChoosenPictureElement = evt.target.closest('.picture');
  if (ChoosenPictureElement) {
    const pictureId = indexPictureImage(ChoosenPictureElement);
    document.querySelector('body').classList.add('modal-open');

    const dataPost = window.filter.preparedPosts;

    showBigPicture(dataPost, pictureId);
  }
};

const closeItems = () => {
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');

  window.picture.socialComments.textContent = '';
  window.preview.buttonPictureItems.removeEventListener('click', closeItems);
  window.picture.pictureNode.removeEventListener('keydown', window.button.onButtonEscapeItem);
  window.picture.pictureNode.addEventListener('keydown', window.button.onButtonEnterItem);
};

window.preview = {
  bigPicture: bigPicture,
  onItemOpen: onItemOpen,
  closeItems: closeItems,
  buttonPictureItems: buttonPictureItems,
  onFilterItemOpenClick: onFilterItemOpenClick,
  indexPictureImage: indexPictureImage,
  showBigPicture: showBigPicture,
};
