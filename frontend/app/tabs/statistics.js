import React from 'react';
import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

const StatisticsScreen = () => {
    const { accountId } = useLocalSearchParams();

    return (
        <View>
            <Text>Statistics for account {accountId}</Text>
            {/* Fetch and display overview data for the account */}
        </View>
    );
};

export default StatisticsScreen;
