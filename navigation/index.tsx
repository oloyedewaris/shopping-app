import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Product from "@/screens/Product";
import BottomNavigation from "./BottomNavigation";
import { HomeNavigationList } from "@/types/all.type";
import History from "@/screens/History";
import Saved from "@/screens/Saved";

const Stack = createNativeStackNavigator<HomeNavigationList>();

const NavigationCon = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, headerTitleAlign: "center" }}>
        <Stack.Screen name="Dashboard" component={BottomNavigation} />
        <Stack.Screen name="Product" component={Product} />
        <Stack.Screen name="Saved" component={Saved} options={{ title: 'Saved Items', headerShown: true }} />
        <Stack.Screen name="History" component={History} options={{ title: 'Order History', headerShown: true }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationCon;
