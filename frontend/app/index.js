import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Stack, router } from 'expo-router';
import useCheckLoginStatus from '../hooks/useCheckLoginStatus';

const StarterPage = () => {
    const { isLoading, isLoggedIn } = useCheckLoginStatus();
  
    useEffect(() => {
        if (!isLoading) {
          if (isLoggedIn) {
            router.replace('/home'); // Redirect to Home page
          } else {
            router.replace('/login'); // Redirect to Login page
          }
        }
      }, [isLoading, isLoggedIn, router]);
    
      if (isLoading) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" />
          </View>
        );
      }
    
      return <Stack />;
  }

export default StarterPage;