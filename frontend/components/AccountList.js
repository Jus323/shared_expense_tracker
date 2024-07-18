import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { useGlobalContext } from '../context/GlobalProvider';
import { useRouter } from 'expo-router';
import config from '../config';
import styles from '../styles/styles';

const baseApiUrl = config.baseEndPoint;
const accountsEndPoint = `${baseApiUrl}accounts`;

const AccountsList = () => {
    const { user } = useGlobalContext();
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const response = await fetch(`${accountsEndPoint}/${user.userId}`);
                const data = await response.json();
                setAccounts(data);
            } catch (error) {
                console.error('Error fetching accounts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAccounts();
    }, [user.id]);

    if (loading) {
        return <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />;
    }

    return (
        <View style={styles.container}>
            {accounts.map((account) => (
                <TouchableOpacity
                    key={account.accountId}
                    style={styles.accountItem}
                    onPress={() => router.push(`/tabs?accountId=${account.accountId}`)}
                >
                    <Text style={styles.accountName}>{account.accountName}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default AccountsList;
