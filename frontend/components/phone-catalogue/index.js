import Component from '../component';
import compiledTemplate from './template.hbs';

export default class PhoneCatalogue extends Component {
  constructor(options) {
    super(options.el);

    this.selectedItem = null;

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

    this.selectedItem = phoneItemLink.closest('[data-element="phoneItem"]');

    this._trigger('phoneSelected', this.selectedItem.dataset.phoneId);
  }

  registerSelectedItemMouseLeaveHandler(handler) {
    let onMouseLeave = () => {
      handler();

      this.selectedItem.removeEventListener('mouseleave', onMouseLeave);
    };

    this.selectedItem.addEventListener('mouseleave', onMouseLeave);
  }
}