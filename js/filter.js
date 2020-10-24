'use strict';

(function () {

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
    let reg = window.load.post;

    window.picture.pictureNode.addEventListener('click', window.preview.onItemOpenClick);

    reloadPictures(reg);
  };

  const showRandomPictures = () => {

    let updatePosts = window.load.dataServerArr;

    window.data.shuffle(updatePosts);

    const randomArrayPictures = updatePosts.slice(0, 10);

    reloadPictures(randomArrayPictures);

    window.picture.pictureNode.removeEventListener('click', window.preview.onItemOpenClick);

  };

  const showFilterDisscussed = () => {
    let updatePosts = window.load.dataServerArr;

    const filterDisscussed = updatePosts.sort(function (left, right) {
      if (left.comments.length > right.comments.length) {
        return -1;
      } else if (left.comments.length < right.comments.length) {
        return 1;
      } else {
        return 0;
      }
    });

    reloadPictures(filterDisscussed);

    window.picture.pictureNode.removeEventListener('click', window.preview.onItemOpenClick);

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


}());
