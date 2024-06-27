import { Stack } from 'expo-router';
import GlobalProvider from '../context/GlobalProvider';

const RootLayout = () => {
    return (
        <GlobalProvider>
          <Stack>
            <Stack.Screen name="tabs" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="accounts" options={{ headerShown: false }} />
          </Stack>
        </GlobalProvider>
      );
    };

export default RootLayout;