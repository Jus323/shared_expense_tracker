import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/styles';
import { useRouter } from 'expo-router';

const LoginPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
  
    const handleLogin = async () => {
      // Basic validation
      if (!email || !password) {
        setError('Please enter both username and password.');
        return;
      }
  
      // Simulating login logic (replace with your actual login code)
      if (email === 'user' && password === 'password') {
        // Example: Store a token in AsyncStorage upon successful login
        try {
          await AsyncStorage.setItem('userToken', 'abc123'); // Replace 'abc123' with your actual token or flag
          router.replace("/home");
        } catch (error) {
          console.error('Error saving data:', error);
        }
      } else {
        setError('Invalid username or password. Please try again.');
      }
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Login Page</Text>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button title="Login" onPress={handleLogin} />
      </View>
    );
  };  

  export default LoginPage;