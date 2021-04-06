import AsyncStorage from '@react-native-async-storage/async-storage';

/*
  tokenObj = {
    "access_token": "BQByLpjISFXg0L34dtleI44M-w6sHR6KK00NIqqSsN3UadCFp0_lKQO_fdiTG2063uLUaWXrmqWvbC-AHsw",
    "token_type": "Bearer",
    "expires_in": 3600, // seconds
    retrieved: 1617619813235,
  }
*/

export const cacheTokenObj = async (tokenObj) => {
  console.log('Attempting to cache tokenObj', JSON.stringify(tokenObj, null, 2));
  try {
    const jsonValue = JSON.stringify(tokenObj)
    await AsyncStorage.setItem('@tokenObject', jsonValue);
  } catch (error) {
    console.log('Failed to store @tokenObject')
    return null;
  }
}

export const getCachedTokenObj = async () => {
  console.log('Attempting to recover tokenObj from cache');
  try {
    const jsonValue = await AsyncStorage.getItem('@tokenObject');
    return jsonValue !== null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.log('Failed to retrieve @tokenObject');
    return null;
  }
}
