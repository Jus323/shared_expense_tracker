import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import config from '../../config';

const baseApiUrl = config.baseEndPoint;
const userAccountEndPoint = `${baseApiUrl}accountusers`;

const UsersScreen = () => {
    const { accountId } = useLocalSearchParams();
    const { user } = useGlobalContext();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAccountUsers = async () => {
            try {
                const response = await fetch(`${userAccountEndPoint}/${accountId}`);
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching account users:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAccountUsers();
    }, [accountId]);

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Users for account {accountId}</Text>
            <FlatList
                data={users}
                keyExtractor={(item) => item.userId.toString()}
                renderItem={({ item }) => (
                    <View style={styles.userContainer}>
                        <Text style={styles.userName}>{item.firstName} {item.lastName}</Text>
                        <Text style={styles.userEmail}>{item.email}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    userContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    userEmail: {
        fontSize: 14,
        color: '#666',
    },
});

export default UsersScreen;
