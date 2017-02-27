'use strict';

class PhonePage {
  constructor(options) {
    this._el = options.el;


    this._search = new Search({
      el: this._el.querySelector('[data-component="search"]')
    });

    this._shoppingCart = new ShoppingCart({
      el: this._el.querySelector('[data-component="shoppingCart"]')
    });

    this._catalogue = new PhoneCatalogue({
      el: this._el.querySelector('[data-component="phoneCatalogue"]')
    });

    this._search.on('valueChanged', (event) => {
      let query = event.detail;

      this._loadPhones(query)
    });

    this._catalogue.on('phoneSelected', event => {
      this._shoppingCart.addItem(event.detail)
    });

    this._loadPhones();
  }

  _loadPhones(query = '') {
    let xhr = new XMLHttpRequest();
    let url = '/data/phones.json';

    if (query) {
      url += `?query=${query}`;
    }

    xhr.open('GET', url, true);

    xhr.onload = () => {
      let phones = JSON.parse(xhr.responseText);

      this._catalogue.setData(phones);
    };

    xhr.send();
  }
}
