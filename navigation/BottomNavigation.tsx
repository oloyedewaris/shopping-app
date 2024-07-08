import { AntDesign } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Products from "@/screens/Products";
import CartScreen from "@/screens/CartScreen";
import { BottomNavigationList } from '@/types/navigation.type';
import { Colors } from '@/utils/styles';

const Tab = createBottomTabNavigator<BottomNavigationList>();

const BottomTab = () => {
  const generalOptions = {
    tabBarHideOnKeyboard: true,
    tabBarStyle: {
      bottom: 0.9,
      left: 0,
      right: 0,
      elevation: 10,
      backgroundColor: "#FFFFFF",
    },
    tabBarShowLabel: false,
    headerShown: false,
  }

  return (
    <Tab.Navigator screenOptions={generalOptions} >
      <Tab.Screen name="Products" component={Products} options={{
        tabBarIcon: ({ focused }) => (
          <AntDesign
            name="home"
            size={22}
            color={focused ? Colors.primary500 : "gray"}
          />
        )
      }} />
      <Tab.Screen name="Cart" component={CartScreen} options={{
        tabBarIcon: ({ focused }) => (
          <AntDesign
            name="shoppingcart"
            size={22}
            color={focused ? Colors.primary500 : "gray"}
          />
        )
      }} />
    </Tab.Navigator>
  )
}

export default BottomTab