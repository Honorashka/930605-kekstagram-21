'use strict';

// Валидация хэштегов

const inputHashTags = document.querySelector('.text__hashtags');
const textAreaComment = document.querySelector('.text__description');

const onInputHashTags = () => {
  const hashtags = inputHashTags.value.split(' ');
  for (let i = 0; i < hashtags.length; i++) {
    const re = /^#[\w\d]*$/;
    re.test(hashtags[i]);
    if (!re.test(hashtags[i])) {
      inputHashTags.setCustomValidity('Хэштег должен начинаться с #, и содержать только буквы и цифры.');
    } else if (hashtags[i].length <= window.hashtag.MIN_LENGTH_HASHTAG) {
      inputHashTags.setCustomValidity('Добавьте ' + (window.hashtag.MIN_LENGTH_HASHTAG - hashtags[i].length) + ' симв.');
    } else if (hashtags[i].length > window.hashtag.MAX_LENGHT_HASHTAG) {
      inputHashTags.setCustomValidity('Удалите ' + (hashtags[i].length - window.hashtag.MAX_LENGHT_HASHTAG) + ' симв.');
    } else if (hashtags.length >= 5) {
      inputHashTags.setCustomValidity('Можно указывать не более 5 хэштегов');
    } else if (String(hashtags[i]).toLowerCase() === String(hashtags[i - 1]).toLowerCase()) {
      inputHashTags.setCustomValidity('Хэштеги не должны повторятся');
    } else {
      inputHashTags.setCustomValidity('');
    }
  }
  inputHashTags.reportValidity();
};

window.validation = {
  inputHashTags: inputHashTags,
  onInputHashTags: onInputHashTags,
  textAreaComment: textAreaComment,
};
