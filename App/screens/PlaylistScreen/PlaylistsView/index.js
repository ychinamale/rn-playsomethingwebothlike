import React from 'react';
import {
  ScrollView, StyleSheet,
} from 'react-native';
import { usePlaylists } from '../../../features/Playlists';
import Accordion from './Accordion';

export default function PlaylistsView() {
  const playlists = usePlaylists();
  console.log('Playlists are', JSON.stringify(playlists, null, 2));
  return (
    <ScrollView
      contentContainerStyle={styles.layout}
      showsVerticalScrollIndicator={false}
      style={{ flex: 1 }}
    >
      { playlists.map((playlist, index) => {
        const label = `Playlist ${index + 1}`;
        return (
          <Accordion
            key={playlist.url + index}
            label={label}
            playlist={playlist}
          />
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  layout: {
    flexGrow: 1,
    paddingVertical: 36,
    paddingHorizontal: 12,
  },
});
