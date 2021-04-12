/* eslint-disable global-require */
import React from 'react';
import {
  Image, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import { usePlaylists } from '../../../features/Playlists';
import { scaleFont, scaleSize } from '../../../utils/scaling';

export default function MatchesView() {
  const matches = [];
  const playlists = usePlaylists();
  const playlistA = playlists[0];
  const playlistB = playlists[1];

  const { features: featsA, items: itemsA } = playlistA;
  const { features: featsB, items: itemsB } = playlistB;

  if (featsA.length === 0) {
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

  const getSimilarity = (trackA, trackB) => {
    const danceability = 1 - Math.abs(trackA.danceability - trackB.danceability);
    const energy = 1 - Math.abs(trackA.danceability - trackB.danceability);
    const speechiness = 1 - Math.abs(trackA.speechiness - trackB.speechiness);
    const acousticness = 1 - Math.abs(trackA.acousticness - trackB.acousticness);
    const instrumentalness = 1 - Math.abs(trackA.instrumentalness - trackB.instrumentalness);
    const liveness = 1 - Math.abs(trackA.liveness - trackB.liveness);
    const valence = 1 - Math.abs(trackA.valence - trackB.valence);

    const similarity = (danceability + energy + speechiness
      + acousticness + instrumentalness + liveness + valence) / 7;

    return {
      trackA: { ...trackA },
      trackB: { ...trackB },
      similarity,
    };
  };

  for (let col = 0; col < itemsA.length; col++) {
    for (let row = 0; row < itemsB.length; row++) {
      const trackA = {
        name: itemsA[col].track.name,
        artist: itemsA[col].track.artists[0].name,
        ...featsA[col],
      };

      const trackB = {
        name: itemsB[row].track.name,
        artist: itemsB[row].track.artists[0].name,
        ...featsB[row],
      };

      matches.push(getSimilarity(trackA, trackB));
    }
  }

  const sortedMatches = matches.sort((a, b) => (a.similarity > b.similarity ? -1 : 1));

  return (
    <View style={styles.layout}>
      { sortedMatches.slice(0, 15).map((match) => (
        <View
          key={match.trackA.name + match.trackB.name}
          style={styles.trackArea}
        >
          <TouchableOpacity
            onPress={() => console.log('Play this song')}
            style={{
              alignItems: 'center',
              backgroundColor: 'white',
              borderRadius: scaleSize(8),
              flex: 1,
              height: scaleSize(42),
              justifyContent: 'center',
              margin: scaleSize(8),
              width: scaleSize(60),
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 4,
            }}
          >
            <Text>
              {`${(match.similarity * 100).toFixed(2)}`}
            </Text>
          </TouchableOpacity>
          <View style={{ flex: 5, alignItems: 'center', paddingHorizontal: scaleSize(12) }}>
            <Text numberOfLines={1} style={styles.text}>
              {`${match.trackA.name}`}
            </Text>
            <Text style={{ color: 'white' }}>&</Text>
            <Text numberOfLines={1} style={styles.text}>
              {`${match.trackB.name}`}
            </Text>
          </View>
        </View>
      ))}
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
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    letterSpacing: 1.2,
  },
  trackArea: {
    backgroundColor: '#1db954',
    marginHorizontal: scaleSize(4),
    marginVertical: scaleSize(4),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: scaleSize(8),
    width: scaleSize(360),
    paddingVertical: scaleSize(6),
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
