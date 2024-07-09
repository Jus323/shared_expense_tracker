import { Redirect, Stack } from "expo-router";
import { useGlobalContext } from "../../context/GlobalProvider";

const AuthLayout = () => {
    const { loading, isLogged } = useGlobalContext();
  
    if (!loading && isLogged) return <Redirect href="/home" />;
  
    return (
      <>
        <Stack>
          <Stack.Screen
            name="sign_in"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="sign_up"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
  
      </>
    );
  };
  
  export default AuthLayout;