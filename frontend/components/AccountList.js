import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { useGlobalContext } from '../context/GlobalProvider';
import { useRouter } from 'expo-router';
import config from '../config';

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    accountItem: {
        backgroundColor: '#f0f0f0',
        padding: 15,
        marginBottom: 10,
        borderRadius: 5,
    },
    accountName: {
        fontSize: 18,
    },
});

export default AccountsList;
