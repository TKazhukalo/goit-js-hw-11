import Notiflix from 'notiflix';
import './css/styles.css';
// Описаний в документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";
 
const formEl = document.querySelector('#search-form');
const inputEl = document.querySelector('.intut-js');
const buttonEl = document.querySelector('.btn-js');
const btnLoadMore = document.querySelector('.load-more');
formEl.addEventListener('submit', onSearchQuery);
btnLoadMore.addEventListener('click', onLoadClick);
function onSearchQuery(e) {
    e.preventDefault();
    //const textValue = e.target.value.trim();
    

    
 const { searchQuery } = e.currentTarget.elements;
 //console.log(searchQuery);
   fetchPixabay(searchQuery.value)
   
        .then(data => console.log(data))
        .catch(err => console.log(err))
        .finally(() => formEl.reset());
}

function onLoadClick() {
    
}

function fetchPixabay(searchQuery) {
   
    const BASE_URL = 'https://pixabay.com/api/';
   // const itemPixabay = 'q,image_type,orientation,safesearch';
 const API_KEY = '35838219-a52003e23aa08df0724263fac';
    return fetch(`${BASE_URL}?key=${API_KEY}&q=${searchQuery}`).then(resp =>
  {
     if (resp.ok) {
       Notiflix.Notify.failure(`Sorry, there are no images matching your search query. Please try again.`);
        // throw new Error(resp.statusText);
        } return resp.json();
    });

}
