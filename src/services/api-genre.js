import ApiBackend from './api-backend';

export default class ApiGenre extends ApiBackend {
  getGenreList = async () => {
    const url = `${this.apiBase}genre/movie/list?api_key=${this.apiKey}&language=en-US`;
    const { genres: genresList } = await this.getResponse(url);
    return genresList;
  };
}
