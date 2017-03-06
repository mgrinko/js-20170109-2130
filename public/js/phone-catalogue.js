'use strict';

class PhoneCatalogue extends Component {
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
    let template = document.querySelector('#phone-catalogue-template').innerHTML;
    let compiled = _.template(template);

    this._el.innerHTML = compiled({
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