import React from 'react';
import { ActivityIndicator, Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function SplashScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.layout} style={{ flex: 1 }}>
        <Image
            style={{ width: 300, height: 300 }}
            resizeMode="contain"
            source={require('../../assets/music.gif')}
        />
        <Text style={styles.text}>Play Something We Both Like</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  layout: {
    alignItems: 'center', backgroundColor: 'white', flexGrow: 1, justifyContent: 'center',
    padding: 15,
  },
  text: {
    fontSize: 32,
    textAlign: 'center',
  }
});
