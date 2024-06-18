import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logout } from '../services/authService';

const Home = () => {
const handleLogout = async () => {
    await logout();
}

    return ( 
        <View> 
        <Text>Home</Text>
        <Button title="Logout" onPress={handleLogout}/>
        </View>
    )
}
export default Home;