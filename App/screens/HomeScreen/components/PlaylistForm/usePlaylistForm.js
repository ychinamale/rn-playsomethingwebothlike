import React from 'react';
import axios from 'axios';
import { isValidShareLink } from '../../../../utils/helpers';
import { useSetItems, useSetUrl } from '../../../../features/Playlists';

// to mark problematic urls individually
const initialState = [
  { url: '', items: [], invalidLink: false },
  { url: '', items: [], invalidLink: false },
];

const promisePlaylist = (id, authorization) => new Promise((resolve, reject) => {
  const config = {
    headers: {
      Authorization: authorization,
      'Content-Type': 'application/json',
    },
    method: 'get',
    url: `https://api.spotify.com/v1/playlists/${id}/tracks`,
    params: {
      fields: 'items(track(artists(name), id, name, preview_url))',
    },
  };

  axios(config)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        resolve(response.data);
      } else {
        reject(response);
      }
    })
    .catch((error) => {
      reject(error);
    });
});

const getID = (url) => url.split('https://open.spotify.com/playlist/')[1];

export default function usePlaylistForm() {
  const [error, setError] = React.useState('');
  const [fetchPlaylistError, setFetchPlaylistError] = React.useState('');
  const [playlists, setPlaylists] = React.useState(initialState);
  const setItems = useSetItems();
  const setUrl = useSetUrl();

  const handleUpdate = (index, text) => {
    const copyPlaylists = [...playlists];
    const copyList = { ...playlists[index] };
    copyList.url = text;
    copyList.invalidLink = !isValidShareLink(text);
    copyPlaylists.splice(index, 1, copyList);
    setPlaylists(copyPlaylists);
  };

  const fetchToken = async () => {
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

  const handleSubmit = async () => {
    console.log('Tring to submit playlists');
    setError('');
    setFetchPlaylistError('');

    // fetch spotify token
    const tokenRes = await fetchToken();
    if (tokenRes.error || tokenRes.status !== 200) {
      console.log('Stopping here', tokenRes);
      setError('Failed to retrieve token');
      return null;
    }

    console.log('We got the token', tokenRes.data);
    const authorization = `${tokenRes.data.token_type} ${tokenRes.data.access_token}`;

    const playlistRequests = [];

    // create promises to fetch each playlist
    playlists.forEach((playlist) => {
      playlistRequests.push(
        promisePlaylist(getID(playlist.url), authorization),
      );
    });

    Promise.all(playlistRequests).then((allResponses) => {
      allResponses.forEach((response, index) => {
        setItems(response.items, index);
        setUrl(playlists[index].url, index);
      });
    }).catch((err) => {
      setFetchPlaylistError('Sorry. Failed to fetch one or both playlists');
      console.log(err);
    });

    return null;
  };

  return {
    error,
    fetchPlaylistError,
    handleSubmit,
    handleUpdate,
    playlists,
  };
}
