import React from 'react';

const initialState = {
	playlists: [
		{ url: '', items: [],  },
		{ url: '', items: [],  },
	]
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_ITEMS': {
      const { index, items } = action.payload;
      const copyPlaylists = [...state.playlists];
      const copyList = { ...state.playlists[index] };
      copyList.items = items;
      copyPlaylists.splice(index, 1, copyList);
      return {
        ...state,
        playlists: copyPlaylists,
	    };
    }
    case 'SET_URL': {
      const { index, url } = action.payload;
      const copyPlaylists = [...state.playlists];
      const copyList = { ...state.playlists[index] };
      copyList.url = url;
      copyPlaylists.splice(index, 1, copyList);
      return {
        ...state,
        playlists: copyPlaylists,
	    };
    }
    default:
      return state;
  }
}

export const PlaylistsContext = React.createContext();

export default function PlaylistsContainer({ children }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const store = [
    state,
    {
      setItems: (index, items) => {
        dispatch({ type: 'SET_ITEMS', payload: { index, items }})
      },
      setUrl: (index, url) => {
        dispatch({ type: 'SET_URL', payload: { index, url }})
      },
    }
  ];

  return (
    <PlaylistsContext.Provider value={store}>
      {children}
    </PlaylistsContext.Provider>
  );
}