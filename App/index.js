import 'react-native-gesture-handler';
import React from 'react';
import { Text, View } from 'react-native';
import InstanceInit from './instance';
import MainNavigation from './navigation';

export default function App() {
  return (
    <InstanceInit>
      <MainNavigation />
    </InstanceInit>
  )
}
