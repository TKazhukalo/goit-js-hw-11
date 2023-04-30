import axios from "axios";
axios.defaults.baseURL = 'https://pixabay.com/api';
const API_KEY = '35838219-a52003e23aa08df0724263fac';
const OPTIONS= 'per_page=40&orientation=horizontal&image_type=photo&safesearch=true';
class NewsApiServise {
    constructor() {
            this.searchQuery = '';
        this.page = 1;
    
    }
  async fetchPixabay() {
      try {
          const resp = await axios.get(`/?key=${API_KEY}&q=${this.searchQuery}&page=${this.page}&${OPTIONS}`);
          this.incrementPage();
          return resp;
      }
      catch (err) {
          console.log(err);
      }

    }
    incrementPage() {
        this.page += 1;
    
    }
    resetPage() {
        this.page = 1;
    }
  /*  get query() {
        return this.searchQuery;
    }*/
}
export { NewsApiServise };