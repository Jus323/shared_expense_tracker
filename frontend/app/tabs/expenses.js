import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import ExpensesList from '../../components/ExpensesList.js';
import MonthYearPicker from '../../components/MonthYearPicker.js';
import months from '../../constants/months.js';
import { useGlobalContext } from '../../context/GlobalProvider.js';
import styles from '../../styles/styles'
import icons from '../../constants/icons.js';
import colors from '../../constants/colors.js';

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
        <View style={styles.generalContainer}>
            <View style={styles.dateContainer}>
                <TouchableOpacity onPress={handlePreviousMonth}>
                    <Image 
                    source={icons.left}
                    style={{ width: 21, height: 21, tintColor: colors.darkeragave }}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={openDatePicker}>
                    <Text style={styles.expenseDatePicker}> {formatDate(date)} </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleNextMonth}>
                    <Image 
                    source={icons.right}
                    style={{ width: 21, height: 21, tintColor: colors.darkeragave }}/>
                </TouchableOpacity>
            </View>
            <MonthYearPicker
                visible={showPicker}
                onClose={() => setShowPicker(false)}
                onConfirm={handleConfirm}
                initialDate={date}
            />
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
                <ExpensesList accountId={accountId} month={month} year={year} />
                <View style={styles.addButtonContainer}>
                    <TouchableOpacity onPress={handleAddExpense} style={styles.roundButton} >
                        <Text style={styles.roundButtonText}> + </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default ExpensesScreen;
