import React from 'react';
import { Text, View } from 'react-native';
import PlaylistsView from './PlaylistsView';

export default function DUMMYSCREEN() {
  return (
    <View style={{
      flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center',
    }}
    >
      <Text>
        Playlist Screen, yea!
      </Text>
      <PlaylistsView />
    </View>
  );
}
