'use strict';

class ShoppingCart {
  constructor(options) {
    this._el = options.el;

    this._items = [];

    this._render();
  }

  _render() {
    let template = document.querySelector('#shopping-cart-template').innerHTML;
    let compiled = _.template(template);

    this._el.innerHTML = compiled({
      orderItems: this._items
    });
  }

  addItem(item) {
    this._items.push(item);
    this._render();
  }
}