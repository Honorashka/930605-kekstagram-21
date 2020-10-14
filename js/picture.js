'use strict';

(function () {
  const pictureNode = document.querySelector('.pictures');
  const pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');
  const socialComments = document.querySelector('.social__comment');
  const socialParentsComments = document.querySelector('.social__comments');


  const fragment = document.createDocumentFragment();

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


  // Функция для отрисовки

  const renderPicture = (picture) => {
    const pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

    return pictureElement;
  };

  for (let i = 0; i < 25; i++) {
    const pictureArray = window.data.renderPhotoBlock();
    fragment.appendChild(renderPicture(pictureArray[i]));
  }

  pictureNode.appendChild(fragment);

  window.picture = {
    renderComments,
    pictureNode: pictureNode,
  };

})();
