import "react-native-gesture-handler";

import { StatusBar } from "expo-status-bar";
import { Colors } from "@/utils/styles";
import { ContextProvider } from "@/contexts/CartContext";
import Toast, { BaseToast, ErrorToast, ToastProps } from "react-native-toast-message";
import NavigationContainer from "@/navigation";

export default function App() {
  return (
    <ContextProvider>
      <StatusBar style="auto" />
      <NavigationContainer />
      <Toast config={toastConfig} />
    </ContextProvider>
  );
}

const toastConfig = {
  success: (props: ToastProps) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "green" }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 18,
        fontWeight: "bold",
        color: Colors.primary500,
      }}
      text2Style={{
        fontSize: 16,
      }}
    />
  ),
  error: (props: ToastProps) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: "red" }}
      text1Style={{
        fontSize: 18,
        fontWeight: "bold",
        color: Colors.error500,
      }}
      text2Style={{
        fontSize: 16,
      }}
    />
  ),
};
