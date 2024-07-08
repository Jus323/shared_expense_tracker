import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ActivityIndicator, Alert, SectionList, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import config from '../config';
import ExpenseView from './ExpenseView';
import { useRouter } from 'expo-router';

const baseApiUrl = config.baseEndPoint;
const expensesEndPoint = `${baseApiUrl}expenses`;

const ExpensesList = ({ accountId, month, year }) => {
    const [groupedExpenses, setGroupedExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const fetchExpenses = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${expensesEndPoint}/${accountId}?month=${month}&year=${year}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            // Ensure that the response data is an array
            if (!Array.isArray(data)) {
                throw new Error('API response is not an array');
            }

            // Group expenses by expenseDate
            const groupedData = data.reduce((acc, expense) => {
                const date = expense.expenseDate;
                if (!acc[date]) {
                    acc[date] = [];
                }
                acc[date].push(expense);
                return acc;
            }, {});

            const sections = Object.keys(groupedData).map(date => ({
                title: date,
                data: groupedData[date],
            }));

            setGroupedExpenses(sections);
        } catch (error) {
            console.error('Error fetching expenses:', error);
            Alert.alert('Error', 'There was an issue fetching the expenses. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleExpensePress = (expenseId) => {
        router.push(`/edit_expense?accountId=${accountId}&expenseId=${expenseId}`);
    };

    useEffect(() => {
        fetchExpenses();
    }, [accountId, month, year]);

    useFocusEffect(
        useCallback(() => {
            fetchExpenses();
        }, [accountId, month, year])
    );

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (groupedExpenses.length === 0) {
        return <Text>No expenses found.</Text>;
    }

    return (
        <SectionList
            sections={groupedExpenses}
            keyExtractor={(item) => item.expenseId.toString()}
            renderItem={({ item }) => (
                <ExpenseView expense={item} onPress={() => handleExpensePress(item.expenseId)} />
            )}
            renderSectionHeader={({ section: { title } }) => (
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionHeaderText}>{title}</Text>
                </View>
            )}
            showsVerticalScrollIndicator={false}
        />
    );
};

const styles = StyleSheet.create({
    sectionHeader: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: '#f0f0f0',
    },
    sectionHeaderText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default ExpensesList;
