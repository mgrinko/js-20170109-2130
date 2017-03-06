'use strict';

class PhonePage {
  constructor(options) {
    this._el = options.el;


    this._search = new Search({
      el: this._el.querySelector('[data-component="search"]')
    });

    this._shoppingCart = new ShoppingCart({
      el: this._el.querySelector('[data-component="shoppingCart"]')
    });

    this._catalogue = new PhoneCatalogue({
      el: this._el.querySelector('[data-component="phoneCatalogue"]')
    });

    this._viewer = new PhoneViewer({
      el: this._el.querySelector('[data-component="phoneViewer"]')
    });

    this._search.on('valueChanged', (event) => {
      let query = event.detail;

      this._loadPhones(query)
    });

    this._catalogue.on('phoneSelected', event => {
      let phoneId = event.detail;
      let phoneData =

      this._viewer.setData()
      //this._shoppingCart.addItem(event.detail);
    });

    this._loadPhones();
  }

  _loadPhones(query = '') {
    let url = '/data/phones.json';

    if (query) {
      url += `?query=${query}`;
    }

    HttpService.request(url, {
      method: 'GET',
      success: (phones) => {
        // hack until server can give filtered results
        query = query.toLowerCase();

        phones = phones.filter(phone => {
          return phone.name.toLowerCase().indexOf(query) !== -1;
        });
        // enf hack

        this._catalogue.setData(phones);
      },
      error: (error) => { console.error(error); }
    });

  }
}
