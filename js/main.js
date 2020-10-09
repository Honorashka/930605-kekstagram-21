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

const MIN_LENGTH_HASHTAG = 2;
const MAX_LENGHT_HASHTAG = 20;

const STEP = 25;
const MIN_SCALE = STEP;
const MAX_SCALE = 100;

const BUTTON_ESCAPE = 27;
const BUTTON_ENTER = 13;

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

// Открытие и закртыие окон с помощью клавиш

const onButtonEscapeItems = () => {
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === BUTTON_ESCAPE) {
      bigPicture.classList.add('hidden');
      document.querySelector('body').classList.remove('modal-open');
    }
  });
};

const onOpenItemsEnter = (evt) => {
  const target = evt.target;
  if (target.className === 'picture') {
    if (evt.keyCode === BUTTON_ENTER) {
      bigPicture.classList.remove('hidden');
      document.querySelector('body').classList.add('modal-open');
      onButtonEscapeItems();
    }
  }
};

pictureNode.addEventListener('keydown', onOpenItemsEnter);

// Открытие и закрытие окна редактирования фотографии + с помощью ESC

const uploadCancel = document.querySelector('#upload-cancel');
const uploadFile = document.querySelector('#upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');

const openEditWindow = () => {
  uploadOverlay.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', onButtonEscapeCancel);
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

const onButtonEscapeCancel = (evt) => {
  if (evt.keyCode === BUTTON_ESCAPE && document.activeElement !== inputHashTags && document.activeElement !== textAreaComment) {
    closeEditWindow();
  }
};

// Изменение размера фотографии при загрузке

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
    resetChangeEffectDepth();
  });
};

for (let i = 0; i < effectPreview.length; i++) {
  onClickEffectHandler(effectPreview[i], filterPhotoClass[i]);
}

// Изменения фильтров с помощью тогла, данные при взаимодействии с ползунком пока статичны

const effectLevelPin = document.querySelector('.effect-level__pin');
// const effectsLevelValue = document.querySelector('.effect-level__value');
const effectLevelDepth = document.querySelector('.effect-level__depth');
const effectLevel = document.querySelector('.effect-level');

const changeEffectDepth = () => {
  if (imgUploadPreview.classList.contains('effects__preview--none')) {
    imgUploadPreview.style.filter = 'none';
  } else if (imgUploadPreview.classList.contains('effects__preview--chrome')) {
    imgUploadPreview.style.filter = 'grayscale(2)';
  } else if (imgUploadPreview.classList.contains('effects__preview--sepia')) {
    imgUploadPreview.style.filter = 'sepia(2)';
  } else if (imgUploadPreview.classList.contains('effects__preview--marvin')) {
    imgUploadPreview.style.filter = 'invert(70%)';
  } else if (imgUploadPreview.classList.contains('effects__preview--phobos')) {
    imgUploadPreview.style.filter = 'blur(2px)';
  } else if (imgUploadPreview.classList.contains('effects__preview--heat')) {
    imgUploadPreview.style.filter = 'brightness(2)';
  }
};

const resetChangeEffectDepth = () => {
  if (imgUploadPreview.classList.contains('effects__preview--none')) {
    effectLevel.classList.add('hidden');
    imgUploadPreview.style.filter = 'none';
  } else if (!imgUploadPreview.classList.contains('effects__preview--^')) {
    imgUploadPreview.style.filter = 'none';
    effectLevelPin.style.left = '100%';
    effectLevelDepth.style.width = '100%';
    effectLevel.classList.remove('hidden');
  }
};

effectLevelPin.addEventListener('mouseup', function () {
  changeEffectDepth();
});

// Валидация хэштегов

const inputHashTags = document.querySelector('.text__hashtags');
const textAreaComment = document.querySelector('.text__description');

const onInputHashTags = () => {
  const hashtags = inputHashTags.value.split('');
  for (let i = 0; i < hashtags.length; i++) {
    const re = /^#[\w\d]*$/;
    re.test(hashtags[i]);
    if (!re.test(hashtags[i])) {
      inputHashTags.setCustomValidity('Хэштег должен начинаться с #, и содержать только буквы и цифры.');
    } else if (hashtags[i].length < MIN_LENGTH_HASHTAG) {
      inputHashTags.setCustomValidity('Добавьте ' + (MIN_LENGTH_HASHTAG - hashtags[i].length) + ' симв.');
    } else if (hashtags[i].length > MAX_LENGHT_HASHTAG) {
      inputHashTags.setCustomValidity('Удалите ' + (hashtags[i].length - MAX_LENGHT_HASHTAG) + ' симв.');
    } else if (hashtags.length > 5) {
      inputHashTags.setCustomValidity('Можно указывать не более 5 хэштегов');
    } else {
      inputHashTags.setCustomValidity('');
    }
  }
  inputHashTags.reportValidity();
};

inputHashTags.addEventListener('input', onInputHashTags);
