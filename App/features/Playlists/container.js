import React from 'react';
import PropTypes from 'prop-types';

const initialState = {
  playlists: [
    { url: '', items: [], features: [] },
    { url: '', items: [], features: [] },
  ],
};

const deepCopy = (obj) => JSON.parse(JSON.stringify(obj));

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_FEATURES': {
      const { features, index } = action.payload;
      const playlistsCopy = deepCopy(state.playlists);
      const listCopy = deepCopy(state.playlists[index]);
      listCopy.features = features;
      playlistsCopy.splice(index, 1, listCopy);
      return {
        ...state,
        playlists: playlistsCopy,
      };
    }
    case 'SET_ITEMS': {
      const { items, index } = action.payload;
      const playlistsCopy = deepCopy(state.playlists);
      const listCopy = deepCopy(state.playlists[index]);
      listCopy.items = items;
      playlistsCopy.splice(index, 1, listCopy);
      return {
        ...state,
        playlists: playlistsCopy,
      };
    }
    case 'SET_URL': {
      const { url, index } = action.payload;
      const playlistsCopy = deepCopy(state.playlists);
      const listCopy = deepCopy(state.playlists[index]);
      listCopy.url = url;
      playlistsCopy.splice(index, 1, listCopy);
      return {
        ...state,
        playlists: playlistsCopy,
      };
    }
    case 'RESET_FEATURES': {
      const playlistsCopy = state.playlists.map((playlist) => ({
        ...playlist,
        features: [],
      }));
      return {
        ...state,
        playlists: playlistsCopy,
      };
    }
    default:
      return state;
  }
};

export const PlaylistsContext = React.createContext();

export default function PlaylistsContainer({ children }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const store = [
    state,
    {
      resetFeatures: () => {
        dispatch({ type: 'RESET_FEATURES' });
      },
      setFeatures: (features, index) => {
        dispatch({ type: 'SET_FEATURES', payload: { features, index } });
      },
      setItems: (items, index) => {
        dispatch({ type: 'SET_ITEMS', payload: { items, index } });
      },
      setUrl: (url, index) => {
        dispatch({ type: 'SET_URL', payload: { url, index } });
      },
    },
  ];

  return (
    <PlaylistsContext.Provider value={store}>
      {children}
    </PlaylistsContext.Provider>
  );
}

PlaylistsContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
};
