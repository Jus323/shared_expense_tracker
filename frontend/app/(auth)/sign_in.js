import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  Image, // Import Image component
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../../styles/styles";
import { router } from "expo-router"; // Assuming this is correctly imported from your custom or third-party library
import { login } from "../../services/authService"; // Adjust the import path as per your project structure
import { useGlobalContext } from "../../context/GlobalProvider";

// Import your image
import wallet from "../../assets/images/wallet.png"; // Adjust the path as needed

const LoginPage = () => {
  const { user, setUser } = useGlobalContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setIsLoading(true);

    try {
      const loggedIn = await login(email, password);
      if (loggedIn) {
        const userDataString = await AsyncStorage.getItem("userData");
        const userData = userDataString ? JSON.parse(userDataString) : null;

        if (userData) {
          setUser(userData);
        }

        router.replace("/accounts"); // Navigate to Home page after successful login
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } catch (error) {
      setError(error.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = () => {
    router.push("/sign_up"); // Navigate to Sign up page
  };

  return (
    <SafeAreaView style={styles.loginContainer}>
      {/* Display the image */}
      <Image source={wallet} style={styles.image} />
      {isLoading && <ActivityIndicator size="large" />}
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor={styles.input.placeholderColor}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor={styles.input.placeholderColor}
      />
      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
      <Pressable onPress={handleSignUp}>
        <Text style={styles.linkText}>Sign up</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default LoginPage;
