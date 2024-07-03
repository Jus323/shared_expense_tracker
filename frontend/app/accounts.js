import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { logout } from '../services/authService';
import { useGlobalContext } from '../context/GlobalProvider';
import AccountsList from '../components/AccountList';
import { SafeAreaView } from 'react-native-safe-area-context';

const Accounts = () => {
    const { user } = useGlobalContext();

    const handleLogout = async () => {
        await logout();
    };

    return ( 
        <SafeAreaView style={styles.container}>
            <Text>Welcome {user.firstName}</Text>
            <AccountsList />
            <View style={styles.buttonContainer}>
                <Button title="Logout" onPress={handleLogout}/>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'space-between', // Adjust as needed
    },
    buttonContainer: {
        marginTop: 20,
    },
});

export default Accounts;
