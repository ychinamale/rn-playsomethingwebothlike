import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PlaylistForm from './components/PlaylistForm';
import { scaleFont, scaleSize } from '../../utils/scaling';

export default function HomeScreen() {
  return (
    <View style={styles.layout}>
      <>
        <View style={styles.headingLayout}>
          <Text style={styles.headingText}>
            Enter your Spotify playlists
          </Text>
        </View>
        <PlaylistForm />
      </>
    </View>
  );
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  headingLayout: {
    marginTop: scaleSize(48),
  },
  headingText: {
    color: '#1DB954',
    fontSize: scaleFont(20),
    fontWeight: 'bold',
    letterSpacing: 1.2,
    textAlign: 'center',
    textShadowColor: '#eee',
    textShadowOffset: { width: scaleSize(2), height: scaleSize(4) },
    textShadowRadius: 2,
    height: scaleSize(48),
  },
});
