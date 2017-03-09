import Component from '../component';
import compiledTemplate from './template.hbs';

import globalEventBus from '../../services/global-events-service';

export default class PhoneViewer extends Component {
  constructor(options) {
    super(options.el);

    this._el.addEventListener('click', this._onAddToBasketClick.bind(this));
    this._el.addEventListener('click', this._onBackClick.bind(this));
  }

  setData(phone) {
    this._phone = phone;
    this._render();
  }

  _render() {
    this._el.innerHTML = compiledTemplate({
      phone: this._phone
    });
  }

  _onAddToBasketClick(event) {
    if (!event.target.closest('[data-element="addToBasket"]')) {
      return;
    }

    this._trigger('add', this._phone);
  }

  _onBackClick(event) {
    if (!event.target.closest('[data-element="backButton"]')) {
      return;
    }

    this._trigger('back');
  }
}