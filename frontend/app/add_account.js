import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, SafeAreaView, Image } from 'react-native';
import { useGlobalContext } from '../context/GlobalProvider';
import config from '../config';
import { useRouter } from 'expo-router';
import styles from '../styles/styles';
import icons from '../constants/icons';
import colors from '../constants/colors';

const baseApiUrl = config.baseEndPoint;
const addAccountEndPoint = `${baseApiUrl}accounts`;

const AddAccountScreen = () => {
  const { user } = useGlobalContext();
  const [accountName, setAccountName] = useState('');
  const router = useRouter();

  const handleAddAccount = async () => {
    try {
      const response = await fetch(`${addAccountEndPoint}/${user.userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accountName: accountName,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add account');
      }

      Alert.alert('Success', 'Account added successfully');
      router.push('/accounts'); // Navigate back to accounts list
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
        <TouchableOpacity 
            onPress={() => router.back()}
            style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                <Image 
                    source={icons.back}
                    style={{ width: 18, height: 18 }}
                    color={colors.darkeragave}
                />
                <Text style= {{marginLeft: 8, color: colors.darkeragave}}>Back</Text>
        </TouchableOpacity>
        <View style={styles.generalContainer}>
                <Text style={styles.header}>Add Account</Text>
                <View style={styles.row}>
                    <Text style={styles.label}>Name:</Text>
                    <TextInput
                        style={styles.addExpenseInput}
                        placeholder="Account name"
                        value={accountName}
                        onChangeText={setAccountName}
                    />
                </View>
                
                <TouchableOpacity onPress={handleAddAccount} style={styles.addExpenseButton}>
                    <Text style={styles.buttonText}>Add Account</Text>
                </TouchableOpacity>
            </View>
    </SafeAreaView>

  );
};

export default AddAccountScreen;
