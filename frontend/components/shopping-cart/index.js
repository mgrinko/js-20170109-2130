import Component from '../component';

export default class ShoppingCart extends Component {
  constructor(options) {
    super(options.el);

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