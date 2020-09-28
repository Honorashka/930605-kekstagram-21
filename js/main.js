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


const comments = [];
const pictureBlock = [];

const pictureNode = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const fragment = document.createDocumentFragment();

// Функция генерации случайных чисел
const getRandomNumber = (min, max) => {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

// функция создания генерация случайных комментов

const renderCommentArray = () => {
  for (let i = 0; i < getRandomNumber(0, 25); i++) {
    comments.push({
      avatar: 'img/avatar' + getRandomNumber(1, 6) + '.svg',
      message: getRandomNumber(MESSAGES),
      name: getRandomNumber(NAMES)
    });
  }
  return comments;
};

// Функция генерации объектов


const renderPhotoBlock = () => {
  for (let i = 0; i < 25; i++) {
    pictureBlock.push({
      url: `photos/${i + 1}.jpg`,
      description: 'Описание фотографии',
      likes: getRandomNumber(15, 200),
      comment: renderCommentArray()
    });
  }
  return pictureBlock;
};

// Функция для отрисовки

const renderPicture = (picture) => {
  const pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;

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
const socialComments = document.querySelectorAll('.social__comment');
const socialParentsComments = document.querySelector('.social__comments');
const fragmentComments = document.createDocumentFragment();

// Генерация

const renderComment = () => {
  for (let i = 0; i < renderPhotoBlock.length; i++) {
    bigPictureImg.src = `photos/${i + 1}.jpg`;
    bigPictureLikes.textContent = renderPhotoBlock[0].likes;
    bigPictureComments.textContent = renderPhotoBlock[0].comments.length;
  }
  return renderComment;
};

// Отрисовка

const generationComment = (genComments) => {
  const createComment = socialComments.cloneNode(true);

  createComment.querySelector('.social__picture').src = genComments.avatar;
  createComment.querySelector('.social__picture').alt = genComments.name;
  createComment.querySelector('.social__text').textContent = comments.message;

  return createComment;
};

// Вывод

for (let i = 0; i < comments.length; i++) {
  const createComments = renderComment();
  fragmentComments.appendChild(generationComment(createComments[i]));
}


socialParentsComments.appendChild(fragmentComments);

// Удаление класса

bigPicture.classList.remove('hidden');

// прячем счетики комментариев

bigPicture.document.querySelector('.social__comment-count').classList.add('hidden');
bigPicture.document.querySelector('.comments-loader').classList.add('hidden');
const body = document.querySelector('body');
body.classList.add('modal-open');
