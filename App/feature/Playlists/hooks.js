import { PlaylistFormContext } from './';

export const useItems = () => {
  const [{ items }, { setItems }] = React.useContext(PlaylistFormContext);
  return [items, setItems];
}

export const useUrl = () => {
  const [{ url }, { setUrl }] = React.useContext(PlaylistFormContext);
  return [url, setUrl];
}