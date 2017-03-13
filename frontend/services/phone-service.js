import HttpService from './http-service';

export default {
  getAll(query) {
    let url = '/data/phones.json';

    if (query) {
      url += `?query=${query}`;
    }

    return HttpService.request(url)
      .then((phones) => {
        return this._filterPhones(phones, query);
      });
  },

  get(id) {
    let url = `/data/phones/${id}.json`;

    return HttpService.request(url);
  },

  _filterPhones(phones, query) {
    query = query.toLowerCase();

    return phones.filter(phone => {
      return phone.name.toLowerCase().indexOf(query) !== -1;
    });
  }
};