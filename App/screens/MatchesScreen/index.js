import React from 'react';
import {
  ScrollView, StyleSheet, Text,
} from 'react-native';
import MatchesView from './MatchesView';
import { scaleFont, scaleSize } from '../../utils/scaling';

export default function MatchScreen() {
  return (
    <ScrollView
      contentContainerStyle={[styles.layout, styles.centered]}
      showsVerticalScrollIndicator={false}
      style={{ flex: 1 }}
    >
      <Text style={{
        color: 'black', fontSize: scaleFont(18), fontWeight: 'bold', letterSpacing: 1.2, marginVertical: scaleSize(12),
      }}
      >
        Top 15 Matches
      </Text>
      <MatchesView />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
