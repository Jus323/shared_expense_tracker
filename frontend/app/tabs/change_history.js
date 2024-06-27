import React from 'react';
import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

const ChangeHistoryScreen = () => {
    const { accountId } = useLocalSearchParams();

    return (
        <View>
            <Text>Change History for account {accountId}</Text>
            {/* Fetch and display change history data for the account */}
        </View>
    );
};

export default ChangeHistoryScreen;
