import HttpService from './http-service';

export default {
  getAll(query, { onSuccess, onError }) {
    let url = '/data/phones.json';

    if (query) {
      url += `?query=${query}`;
    }

    HttpService.request(url, {
      success: (phones) => {
        let filteredphones = this._filterPhones(phones, query);

        onSuccess(filteredphones);
      },
      error: onError
    });
  },

  get(id, { onSuccess, onError }) {
    let url = `/data/phones/${id}.json`;

    HttpService.request(url, {
      success: onSuccess,
      error: onError
    });
  },

  _filterPhones(phones, query) {
    query = query.toLowerCase();

    return phones.filter(phone => {
      return phone.name.toLowerCase().indexOf(query) !== -1;
    });
  }
};