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
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

window.hashtag = {
  MIN_LENGTH_HASHTAG: 2,
  MAX_LENGHT_HASHTAG: 20
};

window.scale = {
  STEP: 25,
  MIN_SCALE: 25,
  MAX_SCALE: 100,
};

const MAX_POST = 25;

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
  for (let i = 0; i < MAX_POST; i++) {
    pictures.push({
      url: `photos/${i + 1}.jpg`,
      description: 'Описание фотографии',
      likes: getRandomNumber(15, 200),
      comments: renderCommentArray()
    });
  }
  return pictures;
};

// Функция генерации случайных чисел
const getRandomNumber = (min, max) => {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

const getRandomItemFromArray = (arr) => {
  const index = getRandomNumber(0, arr.length - 1);
  return arr[index];
};

window.data = {
  renderPhotoBlock: renderPhotoBlock,
};
