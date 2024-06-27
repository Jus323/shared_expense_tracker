import React from 'react';
import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

const OverviewScreen = () => {
    const { accountId } = useLocalSearchParams();

    return (
        <View>
            <Text>Overview for account {accountId}</Text>
            {/* Fetch and display overview data for the account */}
        </View>
    );
};

export default OverviewScreen;
