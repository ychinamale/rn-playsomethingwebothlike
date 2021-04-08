import axios from 'axios';

export const fetchToken = async () => {
  const config = {
    method: 'get',
    url: 'https://SpotifyForTwo.ychinamale.repl.co/token',
  };

  try {
    const response = await axios(config);
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
    return { error: 'Failed to fetch token' };
  } catch (err) {
    return TypeError;
  }
};
