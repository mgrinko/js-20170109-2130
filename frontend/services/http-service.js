function onError(error) {
  console.error(error);
}


class MyPromise {
  constructor(behaviourFunction) {
    behaviourFunction(this._resolve, this._reject);
  }

  _resolve(data) {
    handlers.forEach(handler => {
      handler(data);
    })
  }

  _reject(error) {
    errorHandlers.forEach(handler => {
      handler(error);
    })
  }
}

export default {
  /**
   * Returns promise of request sent to the server
   *
   * @param {string} url - request url
   * @param {Object} options - request options
   *
   * @returns {Promise}
   */
  request(url, options = {}) {

    return new Promise((resolve, reject) => {
      let method = options.method || 'GET';
      let xhr = new XMLHttpRequest();

      xhr.open(method, url, true);

      xhr.onload = () => {
        let data = JSON.parse(xhr.responseText);

        resolve(data);
      };

      xhr.onerror = () => {
        reject(new Error(xhr.status + ' ' + xhr.statusText));
      };

      xhr.send();
    });
  }
}