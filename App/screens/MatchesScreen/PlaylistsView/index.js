import React from 'react';
import { Text, View } from 'react-native';
import { usePlaylists } from '../../../features/Playlists';

export default function PlaylistsView() {
  const playlists = usePlaylists();
  console.log('Playlists are', JSON.stringify(playlists, null, 2));
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Table of playlists here</Text>
    </View>
  );
}
