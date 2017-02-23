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

    setTimeout(() => {
      this._shoppingCart.addItem(1);
    }, 1000);

    setTimeout(() => {
      this._shoppingCart.addItem(1);
    }, 2000);

    setTimeout(() => {
      this._shoppingCart.addItem(1);
    }, 3000);

    setTimeout(() => {
      this._shoppingCart.addItem(1);
    }, 4000);
  }
}
