import ApiBackend from './api-backend';

export default class ApiRate extends ApiBackend {
  postRateMovie = async (id, guestSessionId, rateValue) => {
    await this.postResponse(
      `${this.apiBase}movie/${id}/rating?api_key=${this.apiKey}&guest_session_id=${guestSessionId}`,
      rateValue
    );
  };

  getRatedMovies = async (sessionId, page = 1) => {
    const url = `${this.apiBase}guest_session/${sessionId}/rated/movies?api_key=${this.apiKey}&page=${page}&sort_by=created_at.asc`;
    const body = await this.getResponse(url);
    return body;
  };
}
