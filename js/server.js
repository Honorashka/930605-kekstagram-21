'use strict';

const URL_LOAD = 'https://21.javascript.pages.academy/kekstagram/data';
const URL_UPLOAD = 'https://21.javascript.pages.academy/kekstagram';
const TIMEOUT = 10000;
const StatusCode = {
  OK: 200,
};
const Method = {
  POST: 'POST',
  GET: 'GET',
};

const loadOrUpload = (onSuccess, onError, method, url, data) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  xhr.open(method, url);

  xhr.addEventListener('load', function () {
    if (url === URL_LOAD) {
      const dataServerArr = xhr.response;
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа' + xhr.status + ' ' + xhr.statusText);
      }
      window.load = {
        dataServerArr: dataServerArr,
      };
    } else {
      onSuccess(xhr.response);
    }
  });


  xhr.addEventListener('error', function () {
    onError('Произошла ошибка соединения');
  });
  xhr.addEventListener('timeout', function () {
    onError('Запрос не усел выполниться за ' + xhr.timeout + 'мс');
  });

  xhr.timeout = TIMEOUT;

  xhr.send(data);
};

const load = (onSuccess, onError) => {
  loadOrUpload(onSuccess, onError, Method.GET, URL_LOAD);
};

const upload = (data, onSuccess, onError) => {
  loadOrUpload(onSuccess, onError, Method.POST, URL_UPLOAD, data);
};

window.server = {
  load: load,
  upload: upload
};
