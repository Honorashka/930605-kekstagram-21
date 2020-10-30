'use strict';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const effectLevel = document.querySelector('.effect-level');
const effectPreview = document.querySelectorAll('.effects__radio');
const imgUploadPreview = document.querySelector(`.img-upload__preview`).querySelector('img');
const effectLevelLine = effectLevel.querySelector('.effect-level__line');
const effectLevelPin = effectLevelLine.querySelector('.effect-level__pin');
const effectLevelDepth = effectLevelLine.querySelector('.effect-level__depth');
const uploadCancel = document.querySelector('#upload-cancel');
const uploadFile = document.querySelector('#upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const fileChooser = document.querySelector('.img-upload__start input[type=file]');

fileChooser.addEventListener('change', function () {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some(function (it) {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', function () {
      imgUploadPreview.src = reader.result;

    });

    reader.readAsDataURL(file);
  }
});

const openEditWindow = () => {
  uploadOverlay.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', window.button.onButtonEscapeCancel);
};

const closeEditWindow = () => {
  uploadOverlay.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  uploadFile.value = '';
  imgUploadPreview.className = 'effects__preview--none';
  resetChangeEffectDepth();
};

const filterPhotoClass = [
  'effects__preview--none',
  'effects__preview--chrome',
  'effects__preview--sepia',
  'effects__preview--marvin',
  'effects__preview--phobos',
  'effects__preview--heat'
];

const filterPhotoStyle = [
  'none',
  'grayscale(1)',
  'sepia(1)',
  'invert(100%)',
  'blur(3px)',
  'brightness(3)'
];

const onClickEffectHandler = (effectItem, filterClass, filterEffect) => {
  effectItem.addEventListener('click', function () {
    imgUploadPreview.className = filterClass;
    imgUploadPreview.style.filter = filterEffect;
    resetChangeEffectDepth();
  });
};

for (let i = 0; i < effectPreview.length; i++) {
  onClickEffectHandler(effectPreview[i], filterPhotoClass[i], filterPhotoStyle[i]);
  effectLevel.classList.add('hidden');
}

// Изменения фильтров с помощью тогла + взаимодейсвтие с ползунком работает

const changeEffectDepth = () => {
  if (imgUploadPreview.classList.contains('effects__preview--none')) {
    imgUploadPreview.style.filter = 'none';
  } else if (imgUploadPreview.classList.contains('effects__preview--chrome')) {
    imgUploadPreview.style.filter = `grayscale(${(parseFloat(effectLevelPin.style.left) / 100)})`;
  } else if (imgUploadPreview.classList.contains('effects__preview--sepia')) {
    imgUploadPreview.style.filter = `sepia(${(parseFloat(effectLevelPin.style.left) / 100)})`;
  } else if (imgUploadPreview.classList.contains('effects__preview--marvin')) {
    imgUploadPreview.style.filter = `invert(${effectLevelPin.style.left})`;
  } else if (imgUploadPreview.classList.contains('effects__preview--phobos')) {
    imgUploadPreview.style.filter = `blur(${((parseFloat(effectLevelPin.style.left) / (100 / 3)))}px)`;
  } else if (imgUploadPreview.classList.contains('effects__preview--heat')) {
    imgUploadPreview.style.filter = `brightness(${Math.round(((parseFloat(effectLevelPin.style.left) / (100 / 2) + 1)))})`;
  }
};

const resetChangeEffectDepth = () => {
  if (imgUploadPreview.classList.contains('effects__preview--none')) {
    effectLevel.classList.add('hidden');
    imgUploadPreview.style.filter = 'none';
  } else if (!imgUploadPreview.classList.contains('effects__preview--^')) {
    effectLevelPin.style.left = '100%';
    effectLevelDepth.style.width = '100%';
    effectLevel.classList.remove('hidden');
  }
};

const setEffectValue = (values) => {
  effectLevelPin.style.left = `${Math.round(values * 100)}%`;
  effectLevelDepth.style.width = `${Math.round(values * 100)}%`;
};

const onMouseEffect = (evt) => {
  const widthLevelLine = parseFloat(getComputedStyle(effectLevelLine).width);
  evt.preventDefault();

  let startCoords = {
    x: evt.clientX,
  };

  let dragged = false;

  const onMouseMove = (moveEvt) => {
    moveEvt.preventDefault();

    dragged = true;

    const shift = {
      x: startCoords.x - moveEvt.clientX,
    };

    startCoords = {
      x: moveEvt.clientX,
    };

    const changeLevel = (effectLevelPin.offsetLeft - shift.x) / widthLevelLine;

    if (changeLevel >= 0 && changeLevel <= 1) {
      setEffectValue(changeLevel);
      changeEffectDepth();
    }
  };

  const onMouseUp = (upEvt) => {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    if (dragged) {
      const onClickPreventDefault = function (clickEvt) {
        clickEvt.preventDefault();
        effectLevelPin.removeEventListener(`click`, onClickPreventDefault);
      };
      effectLevelPin.addEventListener(`click`, onClickPreventDefault);
    }
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
};

effectLevelPin.addEventListener('mousedown', onMouseEffect);


window.effects = {
  imgUploadPreview: imgUploadPreview,
  uploadCancel: uploadCancel,
  uploadFile: uploadFile,
  uploadOverlay: uploadOverlay,
  openEditWindow: openEditWindow,
  closeEditWindow: closeEditWindow
};
