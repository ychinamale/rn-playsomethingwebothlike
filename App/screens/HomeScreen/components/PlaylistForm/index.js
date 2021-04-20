/* eslint-disable react/no-array-index-key */
import React from 'react';
import {
  ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View,
} from 'react-native';
import usePlaylistForm from './usePlaylistForm';
import { scaleFont, scaleSize } from '../../../../utils/scaling';

export default function PlaylistForm() {
  const {
    handleSubmit, handleUpdate, isLoading, playlists,
  } = usePlaylistForm();

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
              placeholder={`Playlist ${index + 1}`}
            />
          </View>
        );
      })}
      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        {
          isLoading
            ? <ActivityIndicator color="green" size="small" />
            : <Text style={{ letterSpacing: 1.2 }}>Get Our Playlists</Text>
        }
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    alignItems: 'center',
    color: '#676',
    borderColor: '#7A7',
    borderRadius: scaleSize(8),
    borderWidth: scaleSize(1),
    height: scaleSize(42),
    letterSpacing: 1.1,
    paddingHorizontal: scaleSize(10),
    width: scaleSize(300),
  },
  inputContainer: {
    paddingVertical: scaleSize(12),
  },
  inputError: {
    borderColor: 'red',
    borderWidth: scaleSize(2),
  },
  layout: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#cff0db',
    borderRadius: scaleSize(6),
    justifyContent: 'center',
    height: scaleSize(48),
    marginVertical: scaleSize(12),
    width: scaleSize(160),
    // paddingHorizontal: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
