import React from 'react';
import { View } from 'react-native';
import PlaylistForm from './components/PlaylistForm';

export default function HomeScreen() {
  return (
    <View style={{
      flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center',
    }}
    >
      <PlaylistForm />
    </View>
  );
}
