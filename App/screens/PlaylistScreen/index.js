import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import PlaylistsView from './PlaylistsView';
import { scaleFont, scaleSize } from '../../utils/scaling';

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
    paddingVertical: scaleSize(12),
  },
  image: {
    height: scaleSize(300),
    width: scaleSize(300),
  },
  layout: {
    backgroundColor: 'white',
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
