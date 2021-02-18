import ApiBackend from './api-backend';

export default class ApiRate extends ApiBackend {
  postRateMovie = async (id, guestSessionId, rateValue) => {
    await this.postResponse(
      `${this.apiBase}movie/${id}/rating?${this.apiKey}&guest_session_id=${guestSessionId}`,
      rateValue
    );
  };

  getRatedMovies = async (sessionId) => {
    const url = `${this.apiBase}guest_session/${sessionId}/rated/movies?api_key=${this.apiKey}&language=en-US&sort_by=created_at.asc`;
    const body = await this.getResponse(url);
    return body;
  };
}
