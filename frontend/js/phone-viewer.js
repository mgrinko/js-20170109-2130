import Component from './component';

export default class PhoneViewer extends Component {
  constructor(options) {
    super(options.el);

    //this._el.addEventListener('click', this._onPhoneClick.bind(this))
  }

  setData(phone) {
    this._phone = phone;
    this._render();
  }

  _render() {
    let template = document.querySelector('#phone-viewer-template').innerHTML;
    let compiled = _.template(template);

    this._el.innerHTML = compiled({
      phone: this._phone
    });
  }

  // _onPhoneClick(event) {
  //   let phoneItemLink = event.target.closest('[data-element="phoneItemLink"]');
  //
  //   if (!phoneItemLink) {
  //     return;
  //   }
  //
  //   let selectedPhoneItem = phoneItemLink.closest('[data-element="phoneItem"]');
  //
  //   this._trigger('phoneSelected', selectedPhoneItem.dataset.phoneId);
  // }
}