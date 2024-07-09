import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, Button, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useGlobalContext } from '../context/GlobalProvider';
import config from '../config';

const baseApiUrl = config.baseEndPoint;
const userAccountEndPoint = `${baseApiUrl}accountusers`;

const addUserAccountScreen = () => {
    const { accountId } = useLocalSearchParams();
    const { user } = useGlobalContext();
    const [email, setEmail] = useState('');
    const router = useRouter();

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
        <SafeAreaView style={{ padding: 16 }}>
            <Text style={{ fontSize: 24, marginBottom: 16 }}>Add User to Account</Text>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 16, paddingLeft: 8 }}
                placeholder="Enter email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <Button title="Submit" onPress={handleSubmit} />
        </SafeAreaView>
    );
};

export default addUserAccountScreen;
