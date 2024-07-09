import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Button } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useGlobalContext } from '../../context/GlobalProvider';
import config from '../../config';
import { useFocusEffect } from '@react-navigation/native';

const baseApiUrl = config.baseEndPoint;
const userAccountEndPoint = `${baseApiUrl}accountusers`;

const UsersScreen = () => {
    const { accountId } = useLocalSearchParams();
    const { user } = useGlobalContext();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAccountUsers = async () => {
        setLoading(true);
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

    useFocusEffect(
        useCallback(() => {
            fetchAccountUsers();
        }, [accountId])
    );

    const handleAddUser = () => {
        router.push(`/add_user_account?accountId=${accountId}`);
    };

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
            <View style={styles.addUserContainer}>
                <Button title="Add User" onPress={handleAddUser} />
            </View>
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
    addUserContainer: {
        marginTop: 20,
        alignSelf: 'flex-end',
    },
});

export default UsersScreen;
