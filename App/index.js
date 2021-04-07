import 'react-native-gesture-handler';
import React from 'react';
import InstanceInit from './instance';
import MainNavigation from './navigation';
import { PlaylistContainer } from './features/Playlists';

export default function App() {
  return (
    <InstanceInit>
      <PlaylistContainer>
        <MainNavigation />
      </PlaylistContainer>
    </InstanceInit>
  );
}
