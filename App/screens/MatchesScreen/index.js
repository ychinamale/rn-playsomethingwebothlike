/* eslint-disable global-require */
import React from 'react';
import {
  Image, ScrollView, StyleSheet, Text, View,
} from 'react-native';

export default function DUMMYSCREEN() {
  return (
    <ScrollView
      contentContainerStyle={[styles.layout, styles.centered]}
      showsVerticalScrollIndicator={false}
      style={{ flex: 1 }}
    >
      <Image
        resizeMode="cover"
        style={styles.image}
        source={require('../../assets/nothing-yet-green-500.gif')}
      />
      <View>
        <Text style={styles.text}>Nothing to show... yet.</Text>
      </View>
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
