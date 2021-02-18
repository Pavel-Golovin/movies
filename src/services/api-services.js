export default class ApiServices {
  apiBase = 'https://api.themoviedb.org/3/';

  apiKey = '0ba2480afffac1ffe260d6bed0c6fb99';

  getResponse = async (url) => {
    const response = await fetch(url).catch(() => {
      throw new Error(`Failed to fetch. Check your internet connection`);
    });

    if (!response.ok) {
      throw new Error(`The URL ${url} can not be fetched, received ${response.status}`);
    }

    const body = await response.json();
    return body;
  };

  postResponse = async (url, requestBodyValue) => {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ value: requestBodyValue }),
    });
    if (!response.ok) {
      throw new Error(`The URL ${url} can not be fetched, received ${response.status}`);
    }

    const body = await response.json();
    return body;
  };

  postRateMovie = async (id, guestSessionId, rateValue) => {
    await this.postResponse(
      `${this.apiBase}movie/${id}/rating?${this.apiKey}&guest_session_id=${guestSessionId}`,
      rateValue
    );
  };

  getGuestSessionId = async () => {
    const url = `${this.apiBase}authentication/guest_session/new?api_key=${this.apiKey}`;
    const { guest_session_id: guestSessionId } = await this.getResponse(url);
    return guestSessionId;
  };

  getMoviesBySearch = async (query, page = 1) => {
    const url = `${this.apiBase}search/movie?api_key=${this.apiKey}&language=en-US&query=${query}&page=${page}&include_adult=false`;
    const response = await this.getResponse(url);

    if (response.results.length === 0) {
      throw new Error(`Couldn't find the movie`);
    }

    return response;
  };

  getGenreList = async () => {
    const url = `${this.apiBase}genre/movie/list?api_key=${this.apiKey}&language=en-US`;
    const { genres: genresList } = await this.getResponse(url);
    return genresList;
  };

  getRatedMovies = async (sessionId) => {
    const url = `${this.apiBase}guest_session/${sessionId}/rated/movies?api_key=${this.apiKey}&language=en-US&sort_by=created_at.asc`;
    const body = await this.getResponse(url);
    return body;
  };
}
