'use strict';


window.effects.uploadFile.addEventListener('change', window.effects.openEditWindow);
window.effects.uploadCancel.addEventListener('click', window.effects.closeEditWindow);
window.picture.pictureNode.addEventListener('click', window.preview.onItemOpen);
window.preview.buttonPictureItems.addEventListener('click', window.preview.closeItems);
window.picture.pictureNode.addEventListener('keydown', window.button.onButtonEnterItem);
window.picture.pictureNode.addEventListener('keydown', window.button.onButtonEscapeItem);

