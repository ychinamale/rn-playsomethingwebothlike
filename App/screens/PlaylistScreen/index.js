import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import PlaylistsView from './PlaylistsView';

export default function DUMMYSCREEN() {
  return (
    <ScrollView
      contentContainerStyle={[styles.layout, styles.centered]}
      showsVerticalScrollIndicator={false}
      style={{ flex: 1 }}
    >
      <PlaylistsView />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  expandButton: {
    paddingVertical: 12,
  },
  image: {
    height: 300,
    width: 300,
  },
  layout: {
    backgroundColor: 'white',
    flexGrow: 1,
    paddingVertical: 36,
    paddingHorizontal: 12,
  },
  text: {
    color: 'green',
    fontSize: 16,
    fontStyle: 'italic',
    letterSpacing: 1.2,
  },
});
