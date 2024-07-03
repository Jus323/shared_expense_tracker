import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ExpenseView = ({ expense }) => {
    const { expenseName, expenseAmount, expenseDate, dateSequence, expenseId, description, expenseTypeId, userId, accountId } = expense;

    return (
        <View style={styles.expenseItem}>
            <Text style={styles.expenseName}>{expenseName}</Text>
            <Text style={styles.expenseAmount}>${expenseAmount.toFixed(2)}</Text>
            <Text style={styles.expenseDate}>{expenseDate}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    expenseItem: {
        padding: 15,
        marginVertical: 10,
        backgroundColor: '#e0e0e0',
        borderRadius: 5,
    },
    expenseName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    expenseAmount: {
        fontSize: 16,
        color: '#888',
    },
    expenseDate: {
        fontSize: 14,
        color: '#aaa',
    },
});

export default ExpenseView;
