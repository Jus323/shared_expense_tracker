import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView, Modal, FlatList, Image } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import config from '../config';
import { useGlobalContext } from '../context/GlobalProvider';
import { useLocalSearchParams, useRouter } from 'expo-router';
import icons from '../constants/icons';
import colors from '../constants/colors';
import styles from "../styles/styles"

const baseApiUrl = config.baseEndPoint;
const expenseTypeEndPoint = `${baseApiUrl}expensetype`;
const addExpenseEndPoint = `${baseApiUrl}expenses`;

const AddExpenseScreen = () => {
    const { user } = useGlobalContext();
    const { accountId } = useLocalSearchParams();
    const router = useRouter();
    const [expenseName, setExpenseName] = useState('');
    const [expenseAmount, setExpenseAmount] = useState('');
    const [description, setDescription] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedExpenseType, setSelectedExpenseType] = useState(null);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isExpenseTypeModalVisible, setExpenseTypeModalVisible] = useState(false);
    const [expenseTypes, setExpenseTypes] = useState([]);
    const [canSave, setCanSave] = useState(false);

    useEffect(() => {
        fetchExpenseTypes();
    }, []);

    useEffect(() => {
        // Check if all required fields are filled
        if (expenseName && expenseAmount && selectedExpenseType ) {
            setCanSave(true);
        } else {
            setCanSave(false);
        }
    }, [expenseName, expenseAmount, selectedExpenseType]);

    const fetchExpenseTypes = async () => {
        try {
            const response = await fetch(expenseTypeEndPoint);
            const data = await response.json();
            setExpenseTypes(data);
            if (data.length > 0) {
                setSelectedExpenseType(data[0]);
            }
        } catch (error) {
            console.error('Error fetching expense types:', error);
        }
    };

    const handleSaveExpense = async () => {
        const payload = {
            accountId: accountId,
            description: description,
            expenseAmount: parseFloat(expenseAmount),
            expenseDate: selectedDate.toISOString(),
            expenseName: expenseName,
            expenseTypeId: selectedExpenseType ? selectedExpenseType.expenseTypeId : null,
            userId: user.userId
        };

        try {
            const response = await fetch(addExpenseEndPoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const responseData = await response.json();
            console.log('Expense saved successfully:', responseData);
            router.back();
        } catch (error) {
            console.error('Error saving expense:', error);
        }
    };

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirmDate = (date) => {
        setSelectedDate(date);
        hideDatePicker();
    };

    const renderExpenseTypeItem = ({ item }) => (
        <TouchableOpacity
            style={styles.expenseTypeItem}
            onPress={() => {
                setSelectedExpenseType(item);
                setExpenseTypeModalVisible(false);
            }}
        >
            <Text style={styles.expenseTypeItemText}>{item.expenseTypeName}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={{ flex: 1}}>
            <TouchableOpacity 
                onPress={() => router.back()}
                style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                    <Image 
                        source={icons.back}
                        style={{ width: 18, height: 18 }}
                        color={colors.darkeragave}
                    />
                    <Text style= {{marginLeft: 8, color: colors.darkeragave}}>Back</Text>
                </TouchableOpacity>
            <View style = {styles.generalContainer}>
                <Text style={styles.header}>New Expense </Text>
            <ScrollView> 
                <View style={styles.row}>
                    <Text style={styles.label}>Name:</Text>
                    <TextInput
                        style={styles.addExpenseInput}
                        value={expenseName}
                        onChangeText={setExpenseName}
                    />
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Amount:</Text>
                    <TextInput
                        style={styles.addExpenseInput}
                        value={expenseAmount}
                        onChangeText={setExpenseAmount}
                        keyboardType="numeric"
                    />
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Date:</Text>
                    <TouchableOpacity onPress={showDatePicker} style={[styles.input, styles.dateInput]}>
                        <Text style={styles.dateText}>
                            {selectedDate.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}
                        </Text>
                    </TouchableOpacity>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirmDate}
                        onCancel={hideDatePicker}
                    />
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Type:</Text>
                    <TouchableOpacity
                        style={[styles.input, styles.expenseTypeInput]}
                        onPress={() => setExpenseTypeModalVisible(true)}
                    >
                        <Text style={styles.expenseTypeText}>
                            {selectedExpenseType ? selectedExpenseType.expenseTypeName : 'Select expense type'}
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Description:</Text>
                    <TextInput
                        style={[styles.addExpenseInput, { height: 100 }]}
                        value={description}
                        onChangeText={setDescription}
                        multiline
                    />
                </View>

                <TouchableOpacity onPress={handleSaveExpense} disabled={!canSave} style={styles.addExpenseButton}>
                     <Text style={styles.buttonText}>Add expense</Text>
                </TouchableOpacity>

                <Modal
                    visible={isExpenseTypeModalVisible}
                    transparent={true}
                    animationType="slide"
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Select Expense Type</Text>
                            <FlatList
                                data={expenseTypes}
                                renderItem={renderExpenseTypeItem}
                                keyExtractor={(item) => item.expenseTypeId.toString()}
                            />
                            <TouchableOpacity
                                style={styles.modalCloseButton}
                                onPress={() => setExpenseTypeModalVisible(false)}
                            >
                                <Text style={styles.modalCloseButtonText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default AddExpenseScreen;
