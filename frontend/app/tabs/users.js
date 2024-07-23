import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useGlobalContext } from '../../context/GlobalProvider';
import config from '../../config';
import { useFocusEffect } from '@react-navigation/native';
import styles from '../../styles/styles';

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
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={styles.generalContainer}>
            <Text style={styles.header}>Users</Text>
            <FlatList
                data={users}
                keyExtractor={(item) => item.userId.toString()}
                renderItem={({ item }) => (
                    <View style={styles.userContainer}>
                        <Text style={styles.bodyTextBold}>{item.firstName} {item.lastName}</Text>
                        <Text style={styles.bodyText}>{item.email}</Text>
                    </View>
                )}
            />
            <View style={styles.addButtonContainer}>
                <TouchableOpacity onPress={handleAddUser} style={styles.roundButton}> 
                    <Text style={styles.roundButtonText}> + </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};


export default UsersScreen;
