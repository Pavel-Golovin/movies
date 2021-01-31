
export default class ApiServices {
  
  apiBase = "https://api.themoviedb.org/3/";
  
  apiKey = "api_key=0ba2480afffac1ffe260d6bed0c6fb99";
  
  getMoviesBySearch = async (query) => {
    const response = await fetch(`${this.apiBase}search/movie?${this.apiKey}&language=en-US&query=${query}&page=1&include_adult=false`);
    const body = await response.json();
    return body;
  }
}


