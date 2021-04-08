import React from 'react';
import { PlaylistsContext } from './container';

export const useResetFeatures = () => {
  const [, { resetFeatures }] = React.useContext(PlaylistsContext);
  return resetFeatures;
};

export const useSetFeatures = () => {
  const [, { setFeatures }] = React.useContext(PlaylistsContext);
  return setFeatures;
};

export const useSetItems = () => {
  const [, { setItems }] = React.useContext(PlaylistsContext);
  return setItems;
};

export const useSetUrl = () => {
  const [, { setUrl }] = React.useContext(PlaylistsContext);
  return setUrl;
};

export const usePlaylists = () => {
  const [{ playlists }] = React.useContext(PlaylistsContext);
  return playlists;
};
