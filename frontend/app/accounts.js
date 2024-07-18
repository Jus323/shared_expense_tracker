import React from 'react';
import { View, Text, Button } from 'react-native';
import { logout } from '../services/authService';
import { useGlobalContext } from '../context/GlobalProvider';
import AccountsList from '../components/AccountList';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles/styles';

const Accounts = () => {
  const { user } = useGlobalContext();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <SafeAreaView style={styles.generalContainer}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome {user.firstName}</Text>
        <Text style={styles.header}>Select an account:</Text>
        <AccountsList />
      </View>
      <View style={styles.buttonContainer}>
        <Button style={styles.logoutButton} title="Logout" onPress={handleLogout} />
      </View>
    </SafeAreaView>
  );
};

export default Accounts;
