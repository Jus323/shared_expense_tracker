import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaViewBase } from 'react-native';
import { logout } from '../services/authService';
import { useGlobalContext } from '../context/GlobalProvider';
import AccountsList from '../components/AccountList';
import { SafeAreaView } from 'react-native-safe-area-context';

const Accounts = () => {
    const { user } = useGlobalContext();
    const handleLogout = async () => {
        await logout();
    }

    return ( 
        <SafeAreaView>
        <Text>Welcome {user.firstName}</Text>
        <AccountsList />
        <Button title="Logout" onPress={handleLogout}/>
        </SafeAreaView>
    )
}
export default Accounts;