import React, { useState } from 'react';
import { View, Button, Modal, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import months from '../constants/months';

const MonthYearPicker = ({ visible, onClose, onConfirm, initialDate }) => {
    const [selectedMonth, setSelectedMonth] = useState(initialDate.getMonth());
    const [selectedYear, setSelectedYear] = useState(initialDate.getFullYear());

    const years = [];
    for (let i = 1900; i <= 2100; i++) {
        years.push(i.toString());
    }

    const handleConfirm = () => {
        const date = new Date(selectedYear, selectedMonth);
        onConfirm(date);
        onClose();
    };

    return (
        <Modal
            transparent={true}
            animationType="slide"
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.container}>
                <View style={styles.pickerContainer}>
                    <View style={styles.pickerWrapper}>
                        <Picker
                            selectedValue={selectedMonth}
                            style={styles.picker}
                            onValueChange={(itemValue) => setSelectedMonth(itemValue)}
                        >
                            {months.map((month, index) => (
                                <Picker.Item key={index} label={month} value={index} />
                            ))}
                        </Picker>
                    </View>
                    <View style={styles.pickerWrapper}>
                        <Picker
                            selectedValue={selectedYear}
                            style={styles.picker}
                            onValueChange={(itemValue) => setSelectedYear(itemValue)}
                        >
                            {years.map((year) => (
                                <Picker.Item key={year} label={year} value={parseInt(year)} />
                            ))}
                        </Picker>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button title="Confirm" onPress={handleConfirm} />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    pickerContainer: {
        width: 300,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pickerWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    picker: {
        flex: 1,
    },
    buttonContainer: {
        marginTop: 20,
        width: '100%',
    },
});

export default MonthYearPicker;
