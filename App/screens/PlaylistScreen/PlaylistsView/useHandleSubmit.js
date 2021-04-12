import React from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { usePlaylists, useSetFeatures } from '../../../features/Playlists';
import { fetchToken } from '../../../utils/services';

/**
  * Returns a promise to fetch audio features for several tracks
  * @param {*} ids comma-separated list of spotify IDs for the tracks
  * @param {*} authorization 'bearer <token>'
  * @returns promise
  */
const promiseFeatures = (ids, authorization) => new Promise((resolve, reject) => {
  const config = {
    headers: {
      Authorization: authorization,
      'Content-Type': 'application/json',
    },
    method: 'get',
    url: 'https://api.spotify.com/v1/audio-features',
    params: {
      ids,
      fields: 'audio_features(id,danceability,energy,speechiness,acousticness,instrumentalness,liveness,valence)',
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
    .catch((err) => {
      reject(err);
    });
});

export default function useHandleSubmit() {
  const playlists = usePlaylists();
  const [error, setError] = React.useState('');
  const [featuresError, setFeaturesError] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const navigation = useNavigation();
  const setFeatures = useSetFeatures();

  const handleSubmit = async () => {
    setIsLoading(true);
    // get array of comma-separated track.ids for each playlist
    const idLists = playlists.map((playlist) => playlist.items.map((item) => item.track.id).join());

    const featureRequests = [];

    // fetch spotify tokens
    const tokenRes = await fetchToken();
    if (tokenRes.error || tokenRes.status !== 200) {
      console.log('Stopping here', tokenRes);
      setError('Failed to retrieve token');
      setIsLoading(false);
      return null;
    }

    console.log('We got the token', tokenRes.data);
    const authorization = `${tokenRes.data.token_type} ${tokenRes.data.access_token}`;

    // get promises to fetch features for each idList
    idLists.forEach((idList) => {
      featureRequests.push(
        promiseFeatures(idList, authorization),
      );
    });

    // fetch features for all tracks in the lists
    Promise.all(featureRequests).then((allResponses) => {
      allResponses.forEach((response, index) => {
        const goodFeatures = response.audio_features.map((features) => {
          const {
            id, danceability, energy,
            speechiness, acousticness,
            instrumentalness, liveness, valence,
          } = features;

          return {
            id,
            danceability,
            energy,
            speechiness,
            acousticness,
            instrumentalness,
            liveness,
            valence,
          };
        });

        setFeatures(goodFeatures, index);
      });
    })
      .then(() => {
        setIsLoading(false);
        navigation.navigate('Matches');
      })
      .catch((err) => {
        setFeaturesError('Sorry. Failed to fetch one or both feature lists');
        setIsLoading(false);
        console.log(err);
      });

    return null;
  };

  return {
    error,
    featuresError,
    handleSubmit,
    isLoading,
  };
}
