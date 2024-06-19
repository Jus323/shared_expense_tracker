import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Stack, router } from 'expo-router';
import { useGlobalContext } from '../context/GlobalProvider';

const StarterPage = () => {
  const { loading, isLogged } = useGlobalContext();
  
    useEffect(() => {
        if (!loading) {
          if (isLogged) {
            router.replace('/home'); // Redirect to Home page
          } else {
            router.replace('/login'); // Redirect to Login page
          }
        }
      }, [loading, isLogged, router]);
    
      if (loading) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" />
          </View>
        );
      }
    
      return <Stack />;
  }

export default StarterPage;