'use strict';

class PhonePage {
  constructor(options) {
    this._el = options.el;

    this._shoppingCart = new ShoppingCart({
      el: this._el.querySelector('[data-component="shoppingCart"]')
    });

    this._catalogue = new PhoneCatalogue({
      el: this._el.querySelector('[data-component="phoneCatalogue"]')
    });

    this._catalogue.on('phoneSelected', event => {
      this._shoppingCart.addItem(event.detail)
    });

    this._loadPhones();
  }

  _loadPhones() {
    let xhr = new XMLHttpRequest();

    xhr.open('GET', '/data/phones.json', true);
    xhr.send();

    xhr.onload = () => {
      let phones = JSON.parse(xhr.responseText);
      console.log(phones);

      this._catalogue.setData(phones);
    };
  }
}
