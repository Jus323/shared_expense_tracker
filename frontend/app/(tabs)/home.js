import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { getLoggedInUserInfo } from '../../services/authService';
import { logout } from '../../services/authService';
import { useGlobalContext } from '../../context/GlobalProvider';

const Home = () => {
    const { user } = useGlobalContext;
    const handleLogout = async () => {
        await logout();
    }

    return ( 
        <View> 
        <Text>Welcome {user.firstName}</Text>
        <Button title="Logout" onPress={handleLogout}/>
        </View>
    )
}
export default Home;