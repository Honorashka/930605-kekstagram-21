'use strict';

const pictureFilter = document.querySelector('.img-filters');
const postFilterDefaultButton = document.querySelector('#filter-default');
const postFilterRandomButton = document.querySelector('#filter-random');
const postFilterDiscussedButton = document.querySelector('#filter-discussed');
const buttonFilter = pictureFilter.querySelectorAll('.img-filters__button');

pictureFilter.classList.remove('img-filters--inactive');

const reloadPictures = (updatePosts) => {

  while (document.querySelector('.picture')) {
    document.querySelector('.picture').remove();
  }

  window.picture.successHundler(updatePosts);
};

const showDefaultPictures = () => {
  reloadPictures(window.load.dataServerArr);
  window.picture.pictureNode.addEventListener('click', window.preview.onItemOpen);
  window.picture.pictureNode.removeEventListener('click', window.preview.onFilterItemOpenClick);
  window.picture.pictureNode.removeEventListener('keydown', window.button.onButtonFilterEnterItem);

};


const showRandomPictures = () => {

  let updatePosts = window.load.dataServerArr;

  const preparedPosts = [...updatePosts];

  preparedPosts.sort(function () {
    return 0.5 - Math.random();
  });

  const randomArrayPictures = preparedPosts.slice(0, 10);

  reloadPictures(randomArrayPictures);

  window.picture.pictureNode.removeEventListener('click', window.preview.onItemOpen);
  window.picture.pictureNode.removeEventListener('keydown', window.button.onButtonEnterItem);
  window.picture.pictureNode.addEventListener('keydown', window.button.onButtonFilterEnterItem);
  window.picture.pictureNode.addEventListener('click', window.preview.onFilterItemOpenClick);
  window.filter = {
    preparedPosts: preparedPosts,
  };
};


const showFilterDisscussed = () => {
  let updatePosts = window.load.dataServerArr;

  const preparedPosts = [...updatePosts];

  const filterDisscussed = preparedPosts.sort(function (left, right) {
    if (left.comments.length > right.comments.length) {
      return -1;
    } else if (left.comments.length < right.comments.length) {
      return 1;
    } else {
      return 0;
    }
  });

  reloadPictures(filterDisscussed);
  window.picture.pictureNode.removeEventListener('keydown', window.button.onButtonEnterItem);
  window.picture.pictureNode.removeEventListener('click', window.preview.onItemOpen);
  window.picture.pictureNode.addEventListener('keydown', window.button.onButtonFilterEnterItem);
  window.picture.pictureNode.addEventListener('click', window.preview.onFilterItemOpenClick);

  window.filter = {
    preparedPosts: preparedPosts,
  };

};


const onClickShowDefaultPictures = window.debounce(function () {
  buttonFilter.forEach((el) => el.classList.remove('img-filters__button--active'));
  postFilterDefaultButton.classList.add('img-filters__button--active');

  showDefaultPictures();
});

const onClickShowRandomPictures = window.debounce(function () {
  buttonFilter.forEach((el) => el.classList.remove('img-filters__button--active'));
  postFilterRandomButton.classList.add('img-filters__button--active');

  showRandomPictures();
});

const onClickShowFilterDisscussed = window.debounce(function () {
  buttonFilter.forEach((el) => el.classList.remove('img-filters__button--active'));
  postFilterDiscussedButton.classList.add('img-filters__button--active');

  showFilterDisscussed();
});

postFilterDefaultButton.addEventListener('click', onClickShowDefaultPictures);
postFilterRandomButton.addEventListener('click', onClickShowRandomPictures);
postFilterDiscussedButton.addEventListener('click', onClickShowFilterDisscussed);
