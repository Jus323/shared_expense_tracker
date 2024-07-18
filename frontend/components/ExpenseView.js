import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import config from '../config';
import styles from '../styles/styles';

const baseApiUrl = config.baseEndPoint;
const expenseTypeEndPoint = `${baseApiUrl}expensetype`;

const ExpenseView = ({ expense, onPress }) => {
    const [expenseTypes, setExpenseTypes] = useState([]);
    const [expenseTypeName, setExpenseTypeName] = useState('');

    const fetchExpenseTypes = async () => {
        try {
            const response = await fetch(expenseTypeEndPoint);
            const data = await response.json();
            setExpenseTypes(data);
        } catch (error) {
            console.error('Error fetching expense types:', error);
        }
    };

    useEffect(() => {
        fetchExpenseTypes();
    }, []);

    // Effect to find and set expense type name
    useEffect(() => {
        const type = expenseTypes.find(type => type.expenseTypeId === expense.expenseTypeId);
        if (type) {
            setExpenseTypeName(type.expenseTypeName);
        }
    }, [expenseTypes, expense.expenseTypeId]);

    // Function to truncate expense name if it overlaps with amount
    const truncateExpenseName = (name) => {
        const maxChars = 20; // Example maximum characters before truncation
        if (name.length > maxChars) {
            return `${name.substring(0, maxChars)}...`;
        }
        return name;
    };

    return (
        <TouchableOpacity onPress={() => onPress(expense.expenseId)} style={styles.expenseViewContainer}>
            <View style={styles.leftSection}>
                <Text style={styles.expenseName}>{truncateExpenseName(expense.expenseName)}</Text>
                <Text style={styles.expenseType}>{expenseTypeName}</Text>
            </View>
            <Text style={styles.expenseAmount}>${expense.expenseAmount.toFixed(2)}</Text>
        </TouchableOpacity>
    );
};


export default ExpenseView;
