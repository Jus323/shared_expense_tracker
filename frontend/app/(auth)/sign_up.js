import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { router } from "expo-router"; // Assuming this is correctly imported from your custom or third-party library
import config from "../../config";
import styles from "../../styles/styles";

const baseEndPoint = config.baseEndPoint;
const signUpApiUrl = `${baseEndPoint}users`; // Replace with your actual API base URL

const SignUpScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async () => {
    // Basic validation
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${signUpApiUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
          throw new Error(
            "Email already exists. Please use a different email."
          );
        } else {
          throw new Error(responseData || "Signup failed. Please try again.");
        }
      }

      Alert.alert("Success", "Signup successful! Please login.");

      // Example: Navigating to another screen after successful signup
      router.push("/sign_in"); // Navigate to Login page after successful signup
    } catch (error) {
      Alert.alert("Error", error.message || "Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.loginContainer}>
      <Text style={styles.title}>Sign Up</Text>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          placeholderTextColor={styles.input.placeholderColor}
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          placeholderTextColor={styles.input.placeholderColor}
          value={lastName}
          onChangeText={setLastName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={styles.input.placeholderColor}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={styles.input.placeholderColor}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor={styles.input.placeholderColor}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        {isLoading ? (
          <ActivityIndicator
            style={styles.loader}
            size="large"
            color="#0000ff"
          />
        ) : (
          <Pressable style={styles.button} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Sign up</Text>
          </Pressable>
        )}
    </SafeAreaView>
  );
};

export default SignUpScreen;
