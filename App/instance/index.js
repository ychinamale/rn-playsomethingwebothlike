import React from 'react';
import { getCachedTokenObj } from './cache';
import { isTokenValid } from '../utils/helpers';
import SplashScreen from '../shared/components/SplashScreen';

export const InstanceContext = React.createContext();

export default function InstanceInit({ children }) {

  const [appIsReady, setAppIsReady] = React.useState(false);
  const [token, setToken] = React.useState({});

  const intialise = async () => {
    // attempt to retrieve token from cache
    let tokenObj = await getCachedTokenObj();

    // check if token is valid
    if (isTokenValid(tokenObj)) {
      setToken(tokenObj);
      return null;
    }

    setTimeout(() => {
      console.log('Disabling splash screen.');
      setAppIsReady(true);
    }, 1200);
  }

  React.useEffect(()=>{
    intialise();
  },[])


  if (!appIsReady) {
    console.log('App is not ready yet. Show splash');

    return <SplashScreen />
  }

  return (
    <InstanceContext.Provider value={{ token, setToken }}>
      {children}
    </InstanceContext.Provider>
  )
}
