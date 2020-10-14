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

  effectLevelPin.addEventListener('mousedown', changeEffectDepth);

  const setEffectValue = (value) => {
    effectLevelPin.style.left = `${Math.round(value * 100)}%`;
    effectLevelDepth.style.width = `${Math.round(value * 100)}%`;
  };

  const effectLevelLine = document.querySelector('.effect-level__line');

  effectLevelPin.addEventListener('mousedown', function (evt) {
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

  });

  window.effects = {
    imgUploadPreview: imgUploadPreview,
  };

})();
