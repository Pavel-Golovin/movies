import ApiBackend from './api-backend';

export default class ApiSearch extends ApiBackend {
  getMoviesBySearch = async (query, page = 1) => {
    const url = `${this.apiBase}search/movie?api_key=${this.apiKey}&language=en-US&query=${query}&page=${page}&include_adult=false`;
    const response = await this.getResponse(url);

    if (response.results.length === 0) {
      throw new Error(`Couldn't find the movie`);
    }

    return response;
  };
}
