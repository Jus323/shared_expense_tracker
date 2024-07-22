import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, TextInput, Button, Alert, TouchableOpacity, Image, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useGlobalContext } from '../context/GlobalProvider';
import config from '../config';
import icons from '../constants/icons';
import colors from '../constants/colors';
import styles from '../styles/styles';

const baseApiUrl = config.baseEndPoint;
const userAccountEndPoint = `${baseApiUrl}accountusers`;

const addUserAccountScreen = () => {
    const { accountId } = useLocalSearchParams();
    const { user } = useGlobalContext();
    const [email, setEmail] = useState('');
    const router = useRouter();
    const [canSave, setCanSave] = useState(false);

    useEffect(() => {
        // Check if all required fields are filled
        if (email) {
            setCanSave(true);
        } else {
            setCanSave(false);
        }
    }, [email]);

    const handleSubmit = async () => {
        if (!accountId || accountId === 'undefined') {
            Alert.alert('Error', 'Account ID is invalid');
            return;
        }

        if (!email) {
            Alert.alert('Error', 'Email is required');
            return;
        }

        try {
            const response = await fetch(`${userAccountEndPoint}/${accountId}?email=${encodeURIComponent(email)}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const responseData = await response.text();
            if (response.ok) {
                Alert.alert('Success', responseData);
                router.back()
            } else {
                Alert.alert('Error', responseData);
            }
        } catch (error) {
            console.error("Unexpected error: ", error);
            Alert.alert('Error', 'An unexpected error occurred');
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
                <Text style={styles.header}>Add User</Text>
                <View style={styles.row}>
                    <Text style={styles.label}>Email Address:</Text>
                    <TextInput
                        style={styles.addExpenseInput}
                        placeholder="Enter email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>
                
                <TouchableOpacity onPress={handleSubmit} style={styles.addExpenseButton}>
                    <Text style={styles.buttonText}>Add user</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default addUserAccountScreen;
