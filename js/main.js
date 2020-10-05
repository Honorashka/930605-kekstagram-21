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
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

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

const hiddenComment = () => {
  document.querySelector('.social__comment-count').classList.add('hidden');
  document.querySelector('.comments-loader').classList.add('hidden');
};

hiddenComment();

// Добавил открытие/закрытие карточек

const pictureItems = document.querySelectorAll('.picture__img');


const openItems = () => {
  for (let i = 0; i < pictureItems.length; i++) {
    pictureItems[i].addEventListener('click', function () {
      bigPicture.classList.remove('hidden');
      document.querySelector('body').classList.add('modal-open');
      onButtonEscapeItems();
    });
  }
};

openItems();

const buttonPictureItems = document.querySelector('#picture-cancel');

const closeItems = () => {
  buttonPictureItems.addEventListener('click', function () {
    bigPicture.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
  });
};

closeItems();

const onButtonEscapeItems = () => {
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      bigPicture.classList.add('hidden');
      document.querySelector('body').classList.remove('modal-open');
    }
  });
};

// Открытие и закрытие окна редактирования фотографии + с помощью ESC

const uploadCancel = document.querySelector('#upload-cancel');
const uploadFile = document.querySelector('#upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');

const openEditWindow = () => {
  uploadOverlay.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  onButtonEscapeCancel();
  onInputHashTags();
};

const closeEditWindow = () => {
  uploadOverlay.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  uploadFile.value = '';
  imgUploadPreview.className = 'effects__preview--none';
};

uploadFile.addEventListener('change', function () {
  openEditWindow();
});

uploadCancel.addEventListener('click', function () {
  closeEditWindow();
});

const onButtonEscapeCancel = () => {
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      closeEditWindow();
    }
  });
};

// Изменение размера фотографии при загрузке

const STEP = 25;
const MIN_SCALE = STEP;
const MAX_SCALE = 100;
const imgUploadPreview = document.querySelector(`.img-upload__preview`).querySelector('img');
const scaleValue = document.querySelector(`.scale__control--value`);
const smallButtonScale = document.querySelector(`.scale__control--smaller`);
const bigButtonScale = document.querySelector(`.scale__control--bigger`);

const setScaleValue = (value) => {
  if (value - STEP < MIN_SCALE) {
    scaleValue.value = `${MIN_SCALE}%`;
    imgUploadPreview.style.transform = `scale(${MIN_SCALE / 100})`;
  } else if (value + STEP > MAX_SCALE) {
    scaleValue.value = `${MAX_SCALE}%`;
    imgUploadPreview.style.transform = `scale(${MAX_SCALE / 100})`;
  } else {
    scaleValue.value = `${value}%`;
    imgUploadPreview.style.transform = `scale(${value / 100})`;
  }
};

smallButtonScale.addEventListener(`click`, () => {
  const currentValue = scaleValue.value;
  setScaleValue(parseInt(currentValue, 10) - STEP);
});

bigButtonScale.addEventListener(`click`, () => {
  const currentValue = scaleValue.value;
  setScaleValue(parseInt(currentValue, 10) + STEP);
});

// Оживление ползунка для изменения эффекта + фильтры. Реализация не закончена, нужно будет доделать ползунок и изменение уровень эффекта

const levelPin = document.querySelector('.effect-level__pin');
levelPin.addEventListener('mouseup', function () { });

// Добавление классов с фильтрами на картинку

const effectPreview = document.querySelectorAll('.effects__radio');

const filterPhotoClass = [
  'effects__preview--none',
  'effects__preview--chrome',
  'effects__preview--sepia',
  'effects__preview--marvin',
  'effects__preview--phobos',
  'effects__preview--heat'
];

const onClickEffectHandler = (effectItem, filterClass) => {
  effectItem.addEventListener('click', function () {
    imgUploadPreview.className = filterClass;
  });
};

for (let i = 0; i < effectPreview.length; i++) {
  onClickEffectHandler(effectPreview[i], filterPhotoClass[i]);
}

// Валидация хэштегов

const inputHashTags = document.querySelector('.text__hashtags');
const MIN_LENGTH_HASHTAG = 2;
const MAX_LENGHT_HASHTAG = 20;

const onInputHashTags = () => {
  const hashtags = inputHashTags.value.split('');
  for (let i = 0; i < hashtags.length; i++) {
    const re = /^[\w\d]*$/;
    re.test(hashtags[i]);
    if (!re.test(hashtags[i].lenght)) {
      inputHashTags.setCustomValidity('Хэштег должен начинаться с #, и содержать только буквы и цифры.');
    } else if (hashtags.length < MIN_LENGTH_HASHTAG) {
      inputHashTags.setCustomValidity('Добавьте ' + (MIN_LENGTH_HASHTAG - hashtags[i].length) + ' симв.');
    } else if (hashtags.length > MAX_LENGHT_HASHTAG) {
      inputHashTags.setCustomValidity('Удалите ' + (hashtags[i].length - MAX_LENGHT_HASHTAG) + ' симв.');
    } else if (hashtags[i].length > 5) {
      inputHashTags.setCustomValidity('Можно указывать не более 5 хэштегов');
    } else {
      inputHashTags.setCustomValidity('');
    }
  }
  inputHashTags.reportValidity();
};

inputHashTags.addEventListener('input', onInputHashTags);
