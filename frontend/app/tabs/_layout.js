import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Image } from 'react-native';
import { Tabs, useLocalSearchParams, useRouter } from 'expo-router';
import icons from '../../constants/icons';
import colors from '../../constants/colors';

const TabIcon = ({ icon, color, name, focused }) => {
    return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Image 
                source={icon}
                resizeMode='contain'
                style={{ tintColor: color, width: 21, height: 21 }} // Optional: Apply color if needed
            />
            <Text
                className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
                style={{ color: color, marginTop: 3, fontSize: 13 }}
            >
                {name}
            </Text>
        </View>
    );
};

const TabLayout = () => {
    const router = useRouter();
    const { accountId } = useLocalSearchParams();

    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
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
            </SafeAreaView>
            <Tabs screenOptions={{ 
                tabBarShowLabel: false,
                tabBarActiveTintColor: colors.darkeragave,
                tabBarInactiveTintColor: colors.agave, }}>
                <Tabs.Screen 
                    name="expenses" 
                    options={{ 
                        title: 'Expenses',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                        <TabIcon icon={icons.expense} 
                        color={color}
                        name="Expenses"
                        focused={focused} />),
                    }} 
                    initialParams={{ accountId }} 
                />   
                  {/* <Tabs.Screen 
                    name="statistics" 
                    options={{ 
                        title: 'Statistics',
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon 
                                icon={icons.stats} 
                                color={color}
                                name="Statistics"
                                focused={focused} 
                            />
                        ),
                    }} 
                    initialParams={{ accountId }} 
                /> */}
                <Tabs.Screen 
                    name="users" 
                    options={{ 
                        headerShown: false,
                        title: 'Users',
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon 
                                icon={icons.user} 
                                color={color}
                                name="Users"
                                focused={focused} 
                            />
                        ),
                    }} 
                    initialParams={{ accountId }} 
                />
            </Tabs>
        </View>
    );
};

export default TabLayout;
