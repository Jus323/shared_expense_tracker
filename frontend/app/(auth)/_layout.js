import { Redirect, Stack } from "expo-router";
import { useGlobalContext } from "../../context/GlobalProvider";
import { View, StyleSheet } from "react-native";

const AuthLayout = () => {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/home" />;

  return (
    <View style={styles.container}>
      <Stack>
        <Stack.Screen
          name="sign_in"
          options={{
            headerShown: false,
            contentStyle: styles.screenContent,  // Apply screen content style
          }}
        />
        <Stack.Screen
          name="sign_up"
          options={{
            headerShown: false,
            contentStyle: styles.screenContent,  // Apply screen content style
          }}
        />
      </Stack>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF9F6",
  },
  screenContent: {
    backgroundColor: 'transparent',  // Make screen content transparent
  },
});

export default AuthLayout;
