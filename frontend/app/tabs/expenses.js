import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import ExpensesList from '../../components/ExpensesList.js';
import MonthYearPicker from '../../components/MonthYearPicker.js';
import months from '../../constants/months.js';
import { useGlobalContext } from '../../context/GlobalProvider.js';

const ExpensesScreen = () => {
    const { accountId } = useLocalSearchParams();
    const { user } = useGlobalContext();
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const router = useRouter();

    const openDatePicker = () => {
        setShowPicker(true);
    };

    const handleConfirm = (selectedDate) => {
        setDate(selectedDate);
    };

    const handlePreviousMonth = () => {
        setDate(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setMonth(prevDate.getMonth() - 1);
            return newDate;
        });
    };

    const handleNextMonth = () => {
        setDate(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setMonth(prevDate.getMonth() + 1);
            return newDate;
        });
    };

    const handleAddExpense = () => {
        router.push(`/add_expense?accountId=${accountId}&userId=${user.userId}`);
    };

    const month = date.getMonth() + 1; // getMonth() returns 0-11
    const year = date.getFullYear();

    const formatDate = (date) => {
        const monthName = months[date.getMonth()];
        const year = date.getFullYear();
        return `${monthName} ${year}`;
    };

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Text style={{ fontSize: 20, marginBottom: 20 }}>Expenses for account {accountId}</Text>
            <View style={styles.dateContainer}>
                <Button onPress={handlePreviousMonth} title="Previous" />
                <Button onPress={openDatePicker} title={formatDate(date)} />
                <Button onPress={handleNextMonth} title="Next" />
            </View>
            <MonthYearPicker
                visible={showPicker}
                onClose={() => setShowPicker(false)}
                onConfirm={handleConfirm}
                initialDate={date}
            />
            <ExpensesList accountId={accountId} month={month} year={year} />

            {/* Button to navigate to AddExpenseScreen */}
            <View style={styles.addButtonContainer}>
                <Button title="Add Expense" onPress={handleAddExpense} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    dateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    addButtonContainer: {
        marginTop: 20,
        alignSelf: 'flex-end',
    },
});

export default ExpensesScreen;
