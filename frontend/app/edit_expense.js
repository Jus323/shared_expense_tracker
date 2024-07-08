import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView, Modal, FlatList } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import config from '../config';
import { useGlobalContext } from '../context/GlobalProvider';
import { useLocalSearchParams, useRouter } from 'expo-router';

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
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.row}>
                    <Text style={styles.label}>Expense Name:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter expense name"
                        value={expenseName}
                        onChangeText={setExpenseName}
                    />
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Amount:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter amount"
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
                    <Text style={styles.label}>Expense Type:</Text>
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
                        style={[styles.input, { height: 100 }]}
                        placeholder="Enter description"
                        value={description}
                        onChangeText={setDescription}
                        multiline
                    />
                </View>

                <Button title="Save Expense" onPress={handleSaveExpense} disabled={!canSave} />
                <Button title="Delete Expense" onPress={showDeleteConfirm} color="red" />

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
                            <Text>Are you sure you want to delete this expense?</Text>
                            <View style={styles.modalButtonRow}>
                                <TouchableOpacity
                                    style={[styles.modalButton, styles.modalDeleteButton]}
                                    onPress={handleDeleteExpense}
                                >
                                    <Text style={styles.modalButtonText}>Delete</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.modalButton}
                                    onPress={hideDeleteConfirm}
                                >
                                    <Text style={styles.modalButtonText}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    label: {
        fontSize: 18,
        marginRight: 10,
        minWidth: 100,
    },
    input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
    },
    dateInput: {
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    dateText: {
        fontSize: 16,
        color: '#333',
    },
    expenseTypeInput: {
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    expenseTypeText: {
        fontSize: 16,
        color: '#333',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        width: '80%',
        maxHeight: '80%',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    expenseTypeItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    expenseTypeItemText: {
        fontSize: 16,
    },
    modalCloseButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#ddd',
        borderRadius: 5,
        alignItems: 'center',
    },
    modalCloseButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalButtonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    modalButton: {
        padding: 10,
        backgroundColor: '#ddd',
        borderRadius: 5,
        alignItems: 'center',
        flex: 1,
        marginHorizontal: 5,
    },
    modalButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalDeleteButton: {
        backgroundColor: 'red',
    },
});

export default EditExpenseScreen;
