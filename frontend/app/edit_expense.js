import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, ScrollView, Modal, FlatList, Image } from 'react-native';
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
const updateExpenseEndPoint = `${baseApiUrl}expenses?expenseId=`;
const deleteExpenseEndPoint = `${baseApiUrl}expenses`

const EditExpenseScreen = () => {
    const { user } = useGlobalContext();
    const { accountId, expenseId } = useLocalSearchParams();
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
    const [isDeleteConfirmVisible, setDeleteConfirmVisible] = useState(false);

    useEffect(() => {
        fetchExpenseTypes();
    }, []);

    useEffect(() => {
        fetchExpenseDetails();
    }, [expenseTypes]);

    useEffect(() => {
        if (expenseName && expenseAmount && selectedExpenseType) {
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

    const fetchExpenseDetails = async () => {
        try {
            const response = await fetch(`${updateExpenseEndPoint}${expenseId}`);
            const expenseDetails = await response.json();
            if (expenseDetails) {
                setExpenseName(expenseDetails.expenseName || '');
                setExpenseAmount(expenseDetails.expenseAmount?.toString() || '');
                setDescription(expenseDetails.description || '');
                setSelectedDate(new Date(expenseDetails.expenseDate || new Date()));
                setSelectedExpenseType(
                    expenseTypes.find(type => type.expenseTypeId === expenseDetails.expenseTypeId) || null
                );
            }
        } catch (error) {
            console.error('Error fetching expense details:', error);
        }
    };

    const handleSaveExpense = async () => {
        const payload = {
            description: description,
            expenseAmount: parseFloat(expenseAmount),
            expenseDate: selectedDate.toISOString(),
            expenseName: expenseName,
            expenseTypeId: selectedExpenseType ? selectedExpenseType.expenseTypeId : null,
            userId: user.userId,
        };

        try {
            const response = await fetch(`${updateExpenseEndPoint}${expenseId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const responseData = await response.json();
            console.log('Expense updated successfully:', responseData);
            router.back();
        } catch (error) {
            console.error('Error updating expense:', error);
        }
    };

    const handleDeleteExpense = async () => {
        try {
            const response = await fetch(`${deleteExpenseEndPoint}/${expenseId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                console.log('Expense deleted successfully');
                router.back();
            } else {
                console.error('Error deleting expense');
            }
        } catch (error) {
            console.error('Error deleting expense:', error);
        } finally {
            hideDeleteConfirm();
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

    const showDeleteConfirm = () => {
        setDeleteConfirmVisible(true);
    };

    const hideDeleteConfirm = () => {
        setDeleteConfirmVisible(false);
    };

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
            <View style={styles.generalContainer}>
                <Text style={styles.header}>Edit Expense</Text>
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
                     <Text style={styles.buttonText}>Update expense</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={showDeleteConfirm} style={[styles.addExpenseButton, { backgroundColor: colors.darkeragave }]}>
                     <Text style={styles.buttonText}>Delete expense</Text>
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

                <Modal
                    visible={isDeleteConfirmVisible}
                    transparent={true}
                    animationType="slide"
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Confirm Delete</Text>
                            <Text style={styles.modalText}>Are you sure you want to delete this expense?</Text>
                            <View style={styles.modalButtonContainer}>
                                <TouchableOpacity
                                    style={[styles.modalButton, { backgroundColor: colors.darkeragave }]}
                                    onPress={handleDeleteExpense}
                                >
                                    <Text style={styles.modalButtonText}>Delete</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.modalButton, { backgroundColor: 'gray' }]}
                                    onPress={hideDeleteConfirm}
                                >
                                    <Text style={styles.modalButtonText}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default EditExpenseScreen;
