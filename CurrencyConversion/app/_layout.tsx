import { Stack } from "expo-router";
import NetInfo from '@react-native-community/netinfo';
import { useEffect } from "react";
import { message } from "@/constants/strings";
import { showAlert } from "@/constants/helper";

export default function RootLayout() {

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        showAlert(message.noNetwork, message.noNetworkDes)
      } 
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Stack>
      <Stack.Screen name="index" options={{title: 'Conversion Rate'}} />
    </Stack>
  );
}
