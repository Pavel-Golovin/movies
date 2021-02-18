export default class ApiBackend {
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
}
