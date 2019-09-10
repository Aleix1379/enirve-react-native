import AsyncStorage from '@react-native-community/async-storage';

export default class StorageService {
  keys = {
    AUTH_TOKEN: 'auth-token',
  };

  setAuthToken = async token => {
    try {
      await AsyncStorage.setItem(this.keys.AUTH_TOKEN, JSON.stringify(token));
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
  };

  removeAuthToken = async () => {
    try {
      await AsyncStorage.removeItem(this.keys.AUTH_TOKEN);
    } catch (error) {
      console.log(error.message);
    }
  };

  getAuthToken = async () => {
    try {
      const token = await AsyncStorage.getItem(this.keys.AUTH_TOKEN, null);
      return JSON.parse(token);
    } catch (error) {
      console.log('Error get auth token');
      console.log(error.message);
      return null;
    }
  };
}
