import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ActivityIndicator, Alert, SectionList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import config from '../config';
import ExpenseView from './ExpenseView';
import { useRouter } from 'expo-router';
import styles from '../styles/styles';

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

            // Helper function to format date
            const formatDate = (dateStr) => {
                const date = new Date(dateStr);
                const day = date.getDate();
                const month = date.toLocaleString('default', { month: 'short' });
                const year = date.getFullYear();
                const weekday = date.toLocaleString('default', { weekday: 'short' });
                return `${weekday}, ${day} ${month} ${year}`;
            };

            // Group expenses by expenseDate
            const groupedData = data.reduce((acc, expense) => {
                const date = formatDate(expense.expenseDate);
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
        return (
            <View>
                <Text>No expenses found.</Text>
            </View>
        )
    }


    return (
        <SectionList
            sections={groupedExpenses}
            keyExtractor={(item) => item.expenseId.toString()}
            renderItem={({ item }) => (
                <ExpenseView expense={item} onPress={() => handleExpensePress(item.expenseId)} />
            )}
            renderSectionHeader={({ section: { title } }) => (
                <View style={styles.expenseSectionHeader}>
                    <Text style={styles.expenseSectionHeaderText}>{title}</Text>
                </View>
            )}
            showsVerticalScrollIndicator={false}
        />
    );
};

export default ExpensesList;
