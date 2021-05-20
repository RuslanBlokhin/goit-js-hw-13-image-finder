// const URL =
//   'https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${}&page=${}&per_page=12&key=21690029-4e3c1e0e912ed1ce10e7f026d';

export default class ApiService {
  constructor({ perPage = 12, page = 1 }) {
    this.requestUrl = 'https://pixabay.com/api/';
    this.perPage = perPage;
    this.page = page;
    this.userQuery = '';
  }

  fetchItems() {
    const url = `${this.requestUrl}?image_type=photo&orientation=horizontal&q=${this.userQuery}&page=${this.page}&per_page=12&key=21690029-4e3c1e0e912ed1ce10e7f026d`;
    return fetch(url)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject('Something went wrong');
      })

      .then(data => {
        this.page += 1;
        return data;
      });
  }

  set query(newQuery) {
    this.userQuery = newQuery;
  }
  resetPage() {
    this.page = 1;
  }
}
