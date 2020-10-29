'use strict';

// Изменение размера фотографии при загрузке

const scaleValue = document.querySelector(`.scale__control--value`);
const smallButtonScale = document.querySelector(`.scale__control--smaller`);
const bigButtonScale = document.querySelector(`.scale__control--bigger`);

const setScaleValue = (value) => {
  if (value - window.scale.STEP < window.scale.MIN_SCALE) {
    scaleValue.value = `${window.scale.MIN_SCALE}%`;
    window.effects.imgUploadPreview.style.transform = `scale(${window.scale.MIN_SCALE / 100})`;
  } else if (value + window.scale.STEP > window.scale.MAX_SCALE) {
    scaleValue.value = `${window.scale.MAX_SCALE}%`;
    window.effects.imgUploadPreview.style.transform = `scale(${window.scale.MAX_SCALE / 100})`;
  } else {
    scaleValue.value = `${value}%`;
    window.effects.imgUploadPreview.style.transform = `scale(${value / 100})`;
  }
};

const setScaleValueDown = () => {
  const currentValue = scaleValue.value;
  setScaleValue(parseInt(currentValue, 10) - window.scale.STEP);
};

const setScaleValueUp = () => {
  const currentValue = scaleValue.value;
  setScaleValue(parseInt(currentValue, 10) + window.scale.STEP);
};

smallButtonScale.addEventListener(`click`, setScaleValueDown);

bigButtonScale.addEventListener(`click`, setScaleValueUp);
