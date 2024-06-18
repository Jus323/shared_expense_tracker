import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack, router } from 'expo-router';
import config from '../config';


const baseApiUrl = config.baseEndPoint;
const loginEndpoint = `${baseApiUrl}login`;

export const login = async (email, password) => {
  try {
    console.log(loginEndpoint);
    const response = await fetch(loginEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Login failed. Please try again.');
    }

    // Optionally handle response data if needed
    const userData = await response.json();

    // Store user data in AsyncStorage
    await AsyncStorage.setItem('userData', JSON.stringify(userData));

    return true; // Login successful
  } catch (error) {
    console.error('Error logging in:', error);
    throw error; // Propagate the error back to the caller
  }
};

export const logout = async () => {

  try {
    // Clear user session data
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('userId');
    
    // Optionally clear all keys if you have multiple keys to clear
    // await AsyncStorage.clear();

    // Navigate to the login screen
    router.replace('/login');
  } catch (error) {
    console.error('Error clearing data', error);
    // Handle error or show alert
  }
};