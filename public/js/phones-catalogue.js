'use strict';

class PhonesCatalogue {
  constructor(options) {
    this._el = options.el;

    this._render();
  }

  _render() {
    this._el.innerHTML = 'It works!';

  }
}