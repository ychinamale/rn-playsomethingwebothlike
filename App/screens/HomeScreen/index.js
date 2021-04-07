import React from 'react';
import { Text, View } from 'react-native';
import PlaylistForm from './components/PlaylistForm';

export default function DUMMYSCREEN() {
  return (
    <View style={{
      flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center',
    }}
    >
      <Text>
        HomeScreen, yea!
      </Text>
      <PlaylistForm />
    </View>
  );
}
