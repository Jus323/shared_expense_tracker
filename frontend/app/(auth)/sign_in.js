import React, { useState } from 'react';
import { View, Text, TextInput, ActivityIndicator, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../styles/styles';
import { router } from 'expo-router'; // Assuming this is correctly imported from your custom or third-party library
import { login } from '../../services/authService'; // Adjust the import path as per your project structure
import { useGlobalContext } from '../../context/GlobalProvider';

const LoginPage = () => {
    const { user, setUser } = useGlobalContext();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        // Basic validation
        if (!email || !password) {
            setError('Please enter both email and password.');
            return;
        }

        setIsLoading(true);

        try {
            const loggedIn = await login(email, password);
            if (loggedIn) {
                // Fetch user data from AsyncStorage
                const userDataString = await AsyncStorage.getItem('userData');
                const userData = userDataString ? JSON.parse(userDataString) : null;

                // Update global user state
                if (userData) {
                    setUser(userData);
                }

                router.replace("/accounts"); // Navigate to Home page after successful login
            } else {
                setError('Invalid email or password. Please try again.');
            }
        } catch (error) {
            setError(error.message || 'Login failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSignUp = () => {
        router.push("/sign_up"); // Navigate to Sign up page
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login Page</Text>
            {isLoading && <ActivityIndicator size="large" />}
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <TextInput
                style={styles.input}
                placeholder="Email"
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
            <Pressable style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </Pressable>
            <Pressable style={styles.link} onPress={handleSignUp}>
                <Text style={styles.linkText}>Sign up</Text>
            </Pressable>
        </View>
    );
};

export default LoginPage;
