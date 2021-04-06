import 'react-native-gesture-handler';
import React from 'react';
import { Text, View } from 'react-native';
import InstanceInit from './instance';

export default function App() {
  return (<InstanceInit>
    <View>
      <Text>Something here</Text>
    </View>
  </InstanceInit>)
}
