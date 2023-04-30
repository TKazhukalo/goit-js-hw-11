import { NewsApiServise } from './js/feachApiService';
import { refs } from './js/refsEl';
import { createMarkup } from './js/markup';
import { LoadMoreBtn } from './js/load-more-btn';
import './css/styles.css';
//import { fetchPixabay } from './js/feachApiService';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// Описаний в документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";

const newsApiService = new NewsApiServise();
const loadMoreBtn = new LoadMoreBtn({ selector: '.load-more', hidden: true });
const lightbox = new SimpleLightbox('.gallery a', { captions: true, captionDelay: 250, captionsData: 'alt',});


function onSearchQuery(e) {
    e.preventDefault();
    //const textValue = e.target.value.trim();
  const word = e.currentTarget.elements.searchQuery.value.trim();
  if (word === '') {
    return Notify.info('Please enter a word to search for the image');
  }
 //console.log(searchQuery);
  newsApiService.searchQuery = word;
  loadMoreBtn.show();
  newsApiService.resetPage();
  clearImages()
  fetchPixabay();
}

function clearImages() {
  refs.galleryEl.innerHTML = '';
}

function fetchPixabay() {
  loadMoreBtn.disabled();
  newsApiService.fetchPixabay().then(({data }) => {
    if (data.total===0) {
      Notify.info(`Sorry, there are no images matching your search query ${newsApiService.searchQuery} Please try again.`);
      loadMoreBtn.hide();
      return;
    }
    appMarkupImage(data);
    onScrolling();
    lightbox.refresh();
    const { totalHits } = data;
           if (refs.galleryEl.children.length === totalHits ) {
            Notify.info(`We're sorry, but you've reached the end of search results.`);
      loadMoreBtn.hide();
    } else {
      loadMoreBtn.enable();
      Notify.success(`Hooray! We found ${totalHits} images.`);
    }
  }).catch(handleErr);
}
function handleErr() {
    console.log('Error!');
}

/*function fetchPixabay(content, page) {
  const option = new URLSearchParams({
    key: '35838219-a52003e23aa08df0724263fac',
    q: content,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: 40
  
  });
  return axios.get(`${BASE_URL}?${option}`);
}
*/

/*function fetchPixabay(searchQuery) {
   
    const BASE_URL = 'https://pixabay.com/api/';
   // const itemPixabay = 'q,image_type,orientation,safesearch';
  const API_KEY = '35838219-a52003e23aa08df0724263fac';
  
    return axios.get(`${BASE_URL}?key=${API_KEY}&q=${searchQuery}`).then(resp =>
  {
     if (resp.ok) {
       Notiflix.Notify.failure(`Sorry, there are no images matching your search query. Please try again.`);
        // throw new Error(resp.statusText);
        } return resp.json();
    });

}*/

function appMarkupImage(data) {
  refs.galleryEl.insertAdjacentHTML('beforeend', createMarkup(data));

}

function onScrolling() {
   const { height: cardHeight } = refs.galleryEl.firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: "smooth",
});
}

refs.formEl.addEventListener('submit', onSearchQuery);
loadMoreBtn.refs.button.addEventListener('click', fetchPixabay);