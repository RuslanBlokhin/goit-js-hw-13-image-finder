import './sass/main.scss';

import ApiServise from './js/api-servise.js';
import LoadMoreBtn from './js/load-more-btn.js';
import createMarkup from './js/createMarkup.js';

import { alert, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

const refs = {
  gallery: document.querySelector('.gallery'),
  searchForm: document.querySelector('.search-form'),
  formContainer: document.querySelector('.container'),
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

  if (apiServise.query === '') return alert('Введите запрос!');

  loadMoreBtn.show();
  clearPicturesContainer();
  apiServise.resetPage();
  fetchImages(false); //flag
}

function fetchImages(shouldScroll = true) {
  //flag

  loadMoreBtn.disable();
  apiServise
    .fetchItems()
    .then(data => {
      renderItems(data);
      loadMoreBtn.enable();
      if (!shouldScroll) return;
      window.scrollTo({
        top: document.documentElement.offsetHeight,
        behavior: 'smooth',
      });
    })
    .catch(error => {
      renderError(error);
      loadMoreBtn.hide();
    });
}

const renderError = error => {
  alert({ text: error });
};

function renderItems({ hits }) {
  const markup = createMarkup(hits);
  refs.gallery.insertAdjacentHTML('beforeend', markup);

  // refs.error.textContent = '';
}

function clearPicturesContainer() {
  refs.gallery.innerHTML = '';
}

refs.gallery.addEventListener('click', e => {
  if (e.target.tagName !== 'IMG') return;
  const largeImageURL = e.target.dataset.sourse;
  const instance = basicLightbox.create(`
    <img src="${largeImageURL}" width="800" height="600">
`);
  instance.show();
});
