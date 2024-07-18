// components/BackButton.js
import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import icons from '../constants/icons';
import colors from '../constants/colors';

const BackButton = () => {
    const router = useRouter();

    return (
        <TouchableOpacity 
            onPress={() => router.back()}
            style={styles.container}>
            <Image 
                source={icons.back}
                style={styles.icon}
            />
            <Text style={styles.text}>Back</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    icon: {
        width: 18,
        height: 18,
    },
    text: {
        marginLeft: 8,
        color: colors.darkeragave,
    },
});

export default BackButton;
