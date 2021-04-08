import React from 'react';
import PropTypes from 'prop-types';
import SplashScreen from '../shared/components/SplashScreen';

export const InstanceContext = React.createContext();

export default function InstanceInit({ children }) {
  const [appIsReady, setAppIsReady] = React.useState(false);
  const [token, setToken] = React.useState({});

  const intialise = async () => {
    setTimeout(() => {
      console.log('Disabling splash screen.');
      setAppIsReady(true);
    }, 3500);

    return null;
  };

  React.useEffect(() => {
    intialise();
  }, []);

  if (!appIsReady) {
    console.log('App is not ready yet. Show splash');

    return <SplashScreen />;
  }

  return (
    <InstanceContext.Provider value={{ token, setToken }}>
      {children}
    </InstanceContext.Provider>
  );
}

InstanceInit.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
};
