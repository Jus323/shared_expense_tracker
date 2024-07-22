import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { logout } from '../services/authService';
import { useGlobalContext } from '../context/GlobalProvider';
import AccountsList from '../components/AccountList';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles/styles';
import { useRouter } from 'expo-router';

const Accounts = () => {
  const { user } = useGlobalContext();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
  };

  const handleAddAccount = () => {
    router.push(`/add_account`);
  };

  return (
    <SafeAreaView style={styles.generalContainer}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome {user.firstName}</Text>
        <Text style={styles.header}>Select an account:</Text>
        <AccountsList />
      </View>

      <View style={styles.addButtonContainer}>
        <TouchableOpacity onPress={handleAddAccount} style={styles.roundButton}>
          <Text style={styles.roundButtonText}> + </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleLogout} style={styles.logoutButtonContainer}>
        <Text style={styles.textWhite}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Accounts;
