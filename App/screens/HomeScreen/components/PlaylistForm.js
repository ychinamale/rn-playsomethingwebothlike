import React from 'react';
import axios from 'axios';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { isValidShareLink } from '../../../utils/helpers';

// to mark problematic urls individually
const initialState = [
  { url: '', invalidLink: false },
  { url: '', invalidLink: false },
];

const promisePlaylist = (id, authorization) => {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        'Authorization': authorization,
        'Content-Type': 'application/json',
      },
      method: 'get',
      url: 'https://api.spotify.com/v1/playlists/'+id+'/tracks',
      params: {
        fields: 'items(track(artists(name), id, name, preview_url))'
      }
    };

    axios(config)
      .then(response => {
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
}

const getID = (url) => {
  return url.split('https://open.spotify.com/playlist/')[1];
}

export default function PlaylistForm() {
  const [error, setError] = React.useState('');
  const [fetchPlaylistError, setFetchPlaylistError] = React.useState('');
  const [playlists, setPlaylists] = React.useState(initialState);

  const handleUpdate = (index, text) => {
    const copyPlaylists = [...playlists];
    const copyList = { ...playlists[index] };
    copyList.url = text;
    copyList.invalidLink = !isValidShareLink(text);
    copyPlaylists.splice(index, 1, copyList);
    setPlaylists(copyPlaylists);
  }

  const fetchToken = async () => {
    const config = {
      method: 'get',
      url: 'https://SpotifyForTwo.ychinamale.repl.co/token',
    }

    try  {
      const response = await axios(config);
      if (response.status >= 200 && response.status < 300) {
        return response;
      } else {
        return { error: 'Failed to fetch token' }
      }
    } catch (error) {
      return error;
    }
  }

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

    let playlistRequests = [];

    // create promises to fetch each playlist
    playlists.forEach(playlist => {
      playlistRequests.push(
        promisePlaylist(getID(playlist.url), authorization)
      );

      console.log('requests are', JSON.stringify(playlistRequests, null, 2));
    })

    console.log('Created the promises');

    Promise.all(playlistRequests).then(allResponses => {
      console.log('This is what we got for all responses', JSON.stringify(allResponses, null, 2));

      /* need to create context and update like so, use hooks maybe
      allResponses.forEach((trackList, index) => {
        setPlaylistItems(trackList.items, index);
        setPlaylistUrl(playlists[index].url, index);
      })
      */
    }).catch((error) => {
      setFetchPlaylistError('Sorry. Failed to fetch one or both playlists');
      console.log(error);
    })
  }

  return (
    <View style={styles.layout}>
      {playlists.map((playlist, index) => {
        const inputStyles = [styles.input];
        if (playlist.url.length > 0 && playlist.invalidLink) inputStyles.push(styles.inputError);

        return (
          <View key={`playlist${index}`} style={styles.inputContainer}>
            <TextInput value={playlist.url} onChangeText={ text => handleUpdate(index, text)} style={inputStyles} />
          </View>
        )
      })}
      <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
        <Text>Show Playlists</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    borderColor: 'green',
    borderWidth: 1,
    width: 300,
  },
  inputContainer: {
    paddingVertical: 12,
  },
  inputError: {
    borderColor: 'red',
  },
  layout: {
    alignItems: 'center',
    backgroundColor: 'lightblue',
    flex: 1,
    justifyContent: 'center',
  },
  submitButton: {
    borderColor: 'black',
    borderWidth: 1,
    marginTop: 12,
    padding: 12,
  }
});
