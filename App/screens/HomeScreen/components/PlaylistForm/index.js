/* eslint-disable react/no-array-index-key */
import React from 'react';
import {
  StyleSheet, Text, TextInput, TouchableOpacity, View,
} from 'react-native';
import usePlaylistForm from './usePlaylistForm';

export default function PlaylistForm() {
  const { handleSubmit, handleUpdate, playlists } = usePlaylistForm();

  return (
    <View style={styles.layout}>
      {playlists.map((playlist, index) => {
        const inputStyles = [styles.input];
        if (playlist.url.length > 0 && playlist.invalidLink) {
          inputStyles.push(styles.inputError);
        }

        return (
          <View key={`playlist${index}`} style={styles.inputContainer}>
            <TextInput
              value={playlist.url}
              onChangeText={(text) => handleUpdate(index, text)}
              style={inputStyles}
            />
          </View>
        );
      })}
      <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
        <Text>Show Playlists</Text>
      </TouchableOpacity>
    </View>
  );
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
  },
});
