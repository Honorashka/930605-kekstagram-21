const path = require('path');

module.exports = {
  entry: [
    './js/data.js',
    './js/load.js',
    './js/upload.js',
    './js/picture.js',
    './js/preview-picture.js',
    './js/debounce.js',
    './js/filter.js',
    './js/button-action.js',
    './js/form.js',
    './js/effects-picture.js',
    './js/main.js',
    './js/scale-picture.js',
    './js/validation.js',
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'js'),
    iife: true
  },
  devtool: false
}