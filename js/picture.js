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
      commentBlock.classList.add('hidden');
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

  const successHundler = function (pictures) {
    for (let i = 0; i < pictures.length; i++) {
      fragment.appendChild(renderPicture(pictures[i]));
    }
    pictureNode.appendChild(fragment);
  };

  const errorHundler = function (errorMessage) {
    const node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.load(successHundler, errorHundler);

  window.picture = {
    renderComments,
    pictureNode: pictureNode,
    socialComments: socialParentsComments,
    successHundler: successHundler,
  };

})();
