/* eslint-disable global-require */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import {
  ActivityIndicator, Image, TouchableOpacity, ScrollView, StyleSheet, Text, View,
} from 'react-native';
import { usePlaylists } from '../../../features/Playlists';
import Accordion from './Accordion';
import useHandleSubmit from './useHandleSubmit';
import { scaleFont, scaleSize } from '../../../utils/scaling';

export default function PlaylistsView() {
  const {
    error, featuresError, handleSubmit, isLoading,
  } = useHandleSubmit();
  const playlists = usePlaylists();

  if (playlists[0].items.length === 0) {
    return (
      <View style={[styles.layout, styles.centered]}>
        <Image
          resizeMode="cover"
          style={styles.image}
          source={require('../../../assets/nothing-yet-green-500.gif')}
        />
        <View>
          <Text style={styles.text}>Nothing to show... yet.</Text>
        </View>
      </View>
    );
  }

  return (
    <View
      // contentContainerStyle={styles.layout}
      showsVerticalScrollIndicator={false}
      style={styles.layout}
    >
      { playlists.map((playlist, index) => {
        const label = `Playlist ${index + 1}`;
        return (
          <View key={`${playlist.url}_${index}`} style={styles.expandButton}>
            <Accordion
              label={label}
              playlist={playlist}
            />
          </View>
        );
      })}
      <View>
        <TouchableOpacity
          onPress={handleSubmit}
          style={styles.button}
        >
          {
            isLoading
              ? <ActivityIndicator color="green" size="small" />
              : <Text style={{ letterSpacing: 1.2 }}>Match Us</Text>
          }
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  expandButton: {
    paddingVertical: scaleSize(12),
  },
  image: {
    height: scaleSize(300),
    width: scaleSize(300),
  },
  layout: {
    flex: 1,
    flexGrow: 1,
    paddingVertical: scaleSize(36),
    paddingHorizontal: scaleSize(12),
  },
  text: {
    color: 'green',
    fontSize: scaleFont(16),
    fontStyle: 'italic',
    letterSpacing: 1.2,
  },
});
