import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import { router } from 'expo-router'; // Assuming this is correctly imported from your custom or third-party library
import config from '../../config';

const baseEndPoint = config.baseEndPoint;
const signUpApiUrl = `${baseEndPoint}users`; // Replace with your actual API base URL

const SignUpScreen = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSignUp = async () => {
        // Basic validation
        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            Alert.alert('Error', 'Please fill in all fields.');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match.');
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch(`${signUpApiUrl}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    password,
                }),
            });

            const responseData = await response.text(); // Read response as text

            if (!response.ok) {
                // Check for specific error status
                if (response.status === 409) {
                    throw new Error('Email already exists. Please use a different email.');
                } else {
                    throw new Error(responseData || 'Signup failed. Please try again.');
                }
            }

            Alert.alert('Success', 'Signup successful! Please login.');

            // Example: Navigating to another screen after successful signup
            router.push("/sign_in"); // Navigate to Login page after successful signup
        } catch (error) {
            Alert.alert('Error', error.message || 'Signup failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="First Name"
                    placeholderTextColor="#888"
                    value={firstName}
                    onChangeText={setFirstName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Last Name"
                    placeholderTextColor="#888"
                    value={lastName}
                    onChangeText={setLastName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#888"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#888"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    placeholderTextColor="#888"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                />
                {isLoading ? (
                    <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />
                ) : (
                    <Button title="Sign Up" onPress={handleSignUp} />
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = {
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 40, // Adjust top padding to move form down from top
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        alignSelf: 'center', // Align title to center horizontally
    },
    formContainer: {
        width: '100%',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    loader: {
        marginTop: 20,
    },
};

export default SignUpScreen;
