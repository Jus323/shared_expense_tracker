import React from 'react';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';

const ExpensesScreen = () => {
    const router = useRouter();
    const { accountId } = router.params;

    return (
        <View>
            <Text>Expenses for account {accountId}</Text>
            {/* Fetch and display expenses data for the account */}
        </View>
    );
};

export default ExpensesScreen;