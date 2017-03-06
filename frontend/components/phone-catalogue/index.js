import Component from '../component';
import template from './template.html';

let compiledTemplate = _.template(template);

export default class PhoneCatalogue extends Component {
  constructor(options) {
    super(options.el);

    this._phones = options.phones || [];

    this._render();

    this._el.addEventListener('click', this._onPhoneClick.bind(this))
  }

  setData(phones) {
    this._phones = phones;
    this._render();
  }

  _render() {
    this._el.innerHTML = compiledTemplate({
      phones: this._phones
    });
  }

  _onPhoneClick(event) {
    let phoneItemLink = event.target.closest('[data-element="phoneItemLink"]');

    if (!phoneItemLink) {
      return;
    }

    let selectedPhoneItem = phoneItemLink.closest('[data-element="phoneItem"]');

    this._trigger('phoneSelected', selectedPhoneItem.dataset.phoneId);
  }
}