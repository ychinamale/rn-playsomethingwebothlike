import React from 'react';
import PropTypes from 'prop-types';

const initialState = {
  playlists: [
    { url: '', items: [] },
    { url: '', items: [] },
  ],
};

const deepCopy = (obj) => JSON.parse(JSON.stringify(obj));

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_ITEMS': {
      const { index, items } = action.payload;
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
      const { index, url } = action.payload;
      const playlistsCopy = deepCopy(state.playlists);
      const listCopy = deepCopy(state.playlists[index]);
      listCopy.url = url;
      playlistsCopy.splice(index, 1, listCopy);
      return {
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
      setItems: (items, index) => {
        dispatch({ type: 'SET_ITEMS', payload: { index, items } });
      },
      setUrl: (url, index) => {
        dispatch({ type: 'SET_URL', payload: { index, url } });
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
