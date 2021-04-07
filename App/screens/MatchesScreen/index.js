import React from 'react';
import { Text, View } from 'react-native';

export default function DUMMYSCREEN() {
  return (
    <View style={{
      flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center',
    }}
    >
      <Text>
        Matches Screen, yea!
      </Text>
    </View>
  );
}
