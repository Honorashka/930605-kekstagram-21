'use strict';

// Создание перменных

const NAMES = [
  'Сергей',
  'Полина',
  'Ксюша',
  'Марина',
  'Николай',
  'Александр',
  'Денис',
  'Анотн'
];
const MESSAGES = [
  'Все отлично',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.'
];

const pictureNode = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const fragment = document.createDocumentFragment();

// Функция генерации случайных чисел
const getRandomNumber = (min, max) => {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

const getRandomItemFromArray = (arr) => {
  const index = getRandomNumber(0, arr.length - 1);
  return arr[index];
};

// функция создания генерация случайных комментов

const renderCommentArray = () => {
  const comments = [];
  for (let i = 0; i < 2; i++) {
    comments.push({
      avatar: 'img/avatar-' + getRandomNumber(1, 6) + '.svg',
      message: getRandomItemFromArray(MESSAGES),
      name: getRandomItemFromArray(NAMES)
    });
  }
  return comments;
};

// Функция генерации объектов

const pictures = [];

const renderPhotoBlock = () => {
  for (let i = 0; i < 25; i++) {
    pictures.push({
      url: `photos/${i + 1}.jpg`,
      description: 'Описание фотографии',
      likes: getRandomNumber(15, 200),
      comments: renderCommentArray()
    });
  }
  return pictures;
};

// Функция для отрисовки

const renderPicture = (picture) => {
  const pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments;

  return pictureElement;
};

for (let i = 0; i < 25; i++) {
  const pictureArray = renderPhotoBlock();
  fragment.appendChild(renderPicture(pictureArray[i]));
}

pictureNode.appendChild(fragment);

// Размер фото на весь экран


// Переменные

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = document.querySelector('.big-picture__img').querySelector('img');
const bigPictureLikes = document.querySelector('.likes-count');
const bigPictureComments = document.querySelector('.comments-count');
const socialComments = document.querySelector('.social__comment');
const socialParentsComments = document.querySelector('.social__comments');
const socialCaption = document.querySelector('.social__caption');

// Генерация

const renderComments = (comments) => {
  comments.forEach((comment) => {
    const commentBlock = socialComments.cloneNode(true);
    commentBlock.querySelector('.social__picture').src = comment.avatar;
    commentBlock.querySelector('.social__picture').alt = comment.name;
    commentBlock.querySelector('.social__text').textContent = comment.message;
    socialParentsComments.appendChild(commentBlock);
  });
};

// Функция для отображения

const showBigPicture = () => {
  const picture = pictures[0];

  bigPictureImg.src = picture.url;
  bigPictureLikes.textContent = picture.likes;
  bigPictureComments.textContent = picture.comments.length;
  socialCaption.textContent = picture.description;
  renderComments(picture.comments);
  bigPicture.classList.remove('hidden');

};
showBigPicture();

// прячем счетчики комментариев

const hiddenElement = () => {
  document.querySelector('.social__comment-count').classList.add('hidden');
  document.querySelector('.comments-loader').classList.add('hidden');
};

hiddenElement();

// Добавление модального окна

document.querySelector('body').classList.add('modal-open');
