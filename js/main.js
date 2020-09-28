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
