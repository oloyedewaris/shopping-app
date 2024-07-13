import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Product from "@/screens/Product";
import BottomNavigation from "./BottomNavigation";
import { HomeNavigationList } from "@/types/navigation.type";
import { Image, View } from "react-native";

const Stack = createNativeStackNavigator<HomeNavigationList>();

const NavigationCon = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Dashboard" component={BottomNavigation} />
        <Stack.Screen name="Product" component={Product} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationCon;
