import PhoneViewer from '../phone-viewer';
import PhoneCatalogue from '../phone-catalogue';
import Search from '../search';
import ShoppingCart from '../shopping-cart';
import PhoneService from '../../services/phone-service';

export default class PhonePage {
  constructor(options) {
    this._el = options.el;

    this.initCatalogue();
    this.initSearch();
    this.initViewer();
    this.initShoppingCart();
  }

  initCatalogue() {
    this._catalogue = new PhoneCatalogue({
      el: this._el.querySelector('[data-component="phoneCatalogue"]')
    });

    this._catalogue.on('phoneSelected', event => {
      let phoneId = event.detail;

      let mouseHasLeft = false;
      let serverData = null;

      PhoneService.get(phoneId, {
        onSuccess: (phoneDetails) => {
          serverData = phoneDetails;

          if (!mouseHasLeft) {
            return;
          }

          this._showPhoneDetails(phoneDetails);
        }
      });

      this._catalogue.registerSelectedItemMouseLeaveHandler(() => {
        mouseHasLeft = true;

        if (!serverData) {
          return;
        }

        this._showPhoneDetails(serverData);
      });

    });

    this._loadPhones();
  }

  initViewer() {
    this._viewer = new PhoneViewer({
      el: this._el.querySelector('[data-component="phoneViewer"]')
    });

    this._viewer.on('add', (event) => {
      let phone = event.detail;

      this._shoppingCart.addItem(phone.id);
    });

    this._viewer.on('back', () => {
      window.history.back();
      this._viewer.hide();
      this._catalogue.show();
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

      this._loadPhones(query);
    });
  }

  _showPhoneDetails(phoneData) {
    this._viewer.setData(phoneData);
    this._viewer.show();
    this._catalogue.hide();
  }

  _loadPhones(query = '') {
    PhoneService.getAll(query, {
      onSuccess: (phones) => {
        this._catalogue.setData(phones);
      }
    });
  }
}
