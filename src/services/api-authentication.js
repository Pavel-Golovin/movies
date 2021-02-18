import ApiBackend from './api-backend';

export default class ApiAuthentication extends ApiBackend {
  getGuestSessionId = async () => {
    const url = `${this.apiBase}authentication/guest_session/new?api_key=${this.apiKey}`;
    const { guest_session_id: guestSessionId } = await this.getResponse(url);
    return guestSessionId;
  };
}
