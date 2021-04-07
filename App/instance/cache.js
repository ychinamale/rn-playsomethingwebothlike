import AsyncStorage from '@react-native-async-storage/async-storage';

export const cacheTokenObj = async (tokenObj) => {
  console.log('Attempting to cache tokenObj', JSON.stringify(tokenObj, null, 2));
  try {
    const jsonValue = JSON.stringify(tokenObj);
    await AsyncStorage.setItem('@tokenObject', jsonValue);
  } catch (error) {
    console.log('Failed to store @tokenObject');
    return null;
  }
};

export const getCachedTokenObj = async () => {
  console.log('Attempting to recover tokenObj from cache');
  try {
    const jsonValue = await AsyncStorage.getItem('@tokenObject');
    return jsonValue !== null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.log('Failed to retrieve @tokenObject');
    return null;
  }
};
