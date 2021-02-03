
export default class ApiServices {
  
  apiBase = "https://api.themoviedb.org/3/";
  
  apiKey = "api_key=0ba2480afffac1ffe260d6bed0c6fb99";
  
  getMoviesBySearch = async (query) => {
    const url = `${this.apiBase}search/movie?${this.apiKey}&language=en-US&query=${query}&page=1&include_adult=false`
    const response = await fetch(url);
  
    if (!response.ok) {
      throw new Error(`The URL ${url} can not be fetched, received ${response.status}`);
    }
    
    const body = await response.json();
    
    if (body.results.length === 0) {
      throw new Error(`Couldn't find the movie`);
    }
    
    return body;
  }
}
