import { Stack, useLocalSearchParams } from 'expo-router';
import GlobalProvider from '../context/GlobalProvider';

const RootLayout = () => {
  const { accountId } = useLocalSearchParams();
    return (
        <GlobalProvider>
          <Stack>
            <Stack.Screen name="tabs" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="accounts" options={{ headerShown: false }} />
            <Stack.Screen name="add_expense" options={{ headerShown: false }} initialParams={accountId}/>
          </Stack>
        </GlobalProvider>
      );
    };

export default RootLayout;