import PhoneViewer from './phone-viewer';
import PhoneCatalogue from './phone-catalogue';
import Search from './search';
import ShoppingCart from './shopping-cart';
import HttpService from './http-service';

export default class PhonePage {
  constructor(options) {
    this._el = options.el;

    this.initCatalogue();
    this.initSearch();
    this.initViewer();
    this.initShoppingCart();
  }

  initViewer() {
    this._viewer = new PhoneViewer({
      el: this._el.querySelector('[data-component="phoneViewer"]')
    });
  }

  initShoppingCart() {
    this._shoppingCart = new ShoppingCart({
      el: this._el.querySelector('[data-component="shoppingCart"]')
    });
  }

  initSearch() {
    this._search = new Search({
      el: this._el.querySelector('[data-component="search"]')
    });

    this._search.on('valueChanged', (event) => {
      let query = event.detail;

      this._loadPhones(query)
    });
  }

  initCatalogue() {
    this._catalogue = new PhoneCatalogue({
      el: this._el.querySelector('[data-component="phoneCatalogue"]')
    });

    this._catalogue.on('phoneSelected', event => {
      let phoneId = event.detail;

      this._loadPhoneDetails(phoneId);
    });

    this._loadPhones();
  }

  _loadPhoneDetails(phoneId) {
    let url = `/data/phones/${phoneId}.json`;

    HttpService.request(url, {
      method: 'GET',
      success: this._onPhoneDetailsLoaded.bind(this),
      error: this._onLoadError.bind(this)
    });
  }

  _onPhoneDetailsLoaded(phoneData) {
    this._viewer.setData(phoneData);
    this._viewer.show();
    this._catalogue.hide();
  }

  _loadPhones(query = '') {
    let url = '/data/phones.json';

    if (query) {
      url += `?query=${query}`;
    }

    HttpService.request(url, {
      method: 'GET',
      success: this._onPhonesLoaded.bind(this),
      error: this._onLoadError.bind(this)
    });
  }

  _onPhonesLoaded(phones) {
    // // hack until server can give filtered results
    // query = query.toLowerCase();
    //
    // phones = phones.filter(phone => {
    //   return phone.name.toLowerCase().indexOf(query) !== -1;
    // });
    // // enf hack

    this._catalogue.setData(phones);
  }

  _onLoadError(error) {
    console.error(error);
  }
}
