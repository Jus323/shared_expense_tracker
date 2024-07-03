import React from 'react';
import { SafeAreaView, View, Text, Button } from 'react-native';
import { Tabs, useLocalSearchParams, useRouter } from 'expo-router';

const TabLayout = () => {
    const router = useRouter();
    const { accountId } = useLocalSearchParams();

    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                <Button title="Back" onPress={() => router.back()} />
            </SafeAreaView>
            <Tabs screenOptions={{ tabBarShowLabel: true, headerShown: false }}>
                <Tabs.Screen name="expenses" options={{ title: 'Expenses' }} initialParams={{ accountId }} />   
                <Tabs.Screen name="statistics" options={{ title: 'statistics' }} initialParams={{ accountId }} />
                <Tabs.Screen name="change_history" options={{ title: 'Change History' }} initialParams={{ accountId }} />
            </Tabs>
        </View>
    );
};

export default TabLayout;