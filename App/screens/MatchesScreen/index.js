import React from 'react';
import {
  ScrollView, StyleSheet, Text,
} from 'react-native';
import MatchesView from './MatchesView';

export default function MatchScreen() {
  return (
    <ScrollView
      contentContainerStyle={[styles.layout, styles.centered]}
      showsVerticalScrollIndicator={false}
      style={{ flex: 1 }}
    >
      <Text style={{
        color: 'black', fontSize: 18, fontWeight: 'bold', letterSpacing: 1.2, marginVertical: 12,
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
