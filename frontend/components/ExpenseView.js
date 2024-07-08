import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ExpenseView = ({ expense, onPress }) => {
    return (
        <TouchableOpacity onPress={() => onPress(expense.expenseId)} style={styles.container}>
            <Text style={styles.expenseName}>{expense.expenseName}</Text>
            <Text style={styles.expenseAmount}>${expense.expenseAmount.toFixed(2)}</Text>
            <Text style={styles.expenseDate}>{new Date(expense.expenseDate).toLocaleDateString()}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    expenseName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    expenseAmount: {
        fontSize: 16,
        color: '#555',
    },
    expenseDate: {
        fontSize: 14,
        color: '#777',
    },
});

export default ExpenseView;
