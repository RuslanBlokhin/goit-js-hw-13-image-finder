import './sass/main.scss';

import ApiServise from './js/api-servise.js';
import LoadMoreBtn from './js/load-more-btn.js';
import createMarkup from './js/createMarkup.js';

const refs = {
  gallery: document.querySelector('.gallery'),
  searchForm: document.querySelector('.search-form'),
};

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

const apiServise = new ApiServise({});

refs.searchForm.addEventListener('submit', getUsers);
loadMoreBtn.refs.button.addEventListener('click', fetchImages);

function getUsers(e) {
  e.preventDefault();

  apiServise.query = e.currentTarget.elements.query.value;

  if (apiServise.query === '') return;

  loadMoreBtn.show();
  apiServise.resetPage();
  fetchImages();
}

function fetchImages() {
  loadMoreBtn.disable();
  apiServise.fetchItems().then(data => {
    renderItems(data);
    loadMoreBtn.enable();
  });
  // .catch(err => {
  //   renderError(err);
  //   loadMoreBtn.hide();
  // });
}

function renderItems({ hits }) {
  const markup = createMarkup(hits);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
  // refs.error.textContent = '';
}

// function renderError(err) {
//   refs.gallery.innerHTML = '';
//   refs.error.textContent = err;
// }
