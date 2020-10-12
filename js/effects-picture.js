'use strict';

(function () {
  // Оживление ползунка для изменения эффекта + фильтры. Реализация не закончена, нужно будет доделать ползунок и изменение уровень эффекта

  const effectPreview = document.querySelectorAll('.effects__radio');
  const imgUploadPreview = document.querySelector(`.img-upload__preview`).querySelector('img');

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

  window.effects = {
    imgUploadPreview: imgUploadPreview,
  };

})();
