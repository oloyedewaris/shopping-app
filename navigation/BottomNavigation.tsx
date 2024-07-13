import { AntDesign } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Products from "@/screens/Products";
import CartScreen from "@/screens/CartScreen";
import { BottomNavigationList } from '@/types/navigation.type';
import { Colors } from '@/utils/styles';
import { Image, StyleSheet, View } from 'react-native';
import CheckoutScreen from '@/screens/Checkout';
import { MaterialIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator<BottomNavigationList>();

const BottomTab = () => {
  const generalOptions = {
    tabBarHideOnKeyboard: true,
    tabBarShowLabel: false,
    headerTitleAlign: 'center',
    headerLeft: () => (
      <Image
        source={require("@/assets/images/malltiverse-logo.png")}
        style={{
          width: 99,
          height: 31,
          marginLeft: 15
        }}
      />
    ),
    tabBarStyle: {
      bottom: '2%',
      // elevation: 10,
      width: '90%',
      marginHorizontal: 'auto',
      height: '7%',
      // paddingTop: 10,
      backgroundColor: "#2A2A2A",
      borderRadius: 20,
    },
  }

  return (
    <Tab.Navigator screenOptions={generalOptions} sceneContainerStyle={{ backgroundColor: 'white' }}>
      <Tab.Screen name="Products" component={Products}
        options={{
          title: 'Product List',
          tabBarIcon: ({ focused }) => (
            <View style={focused ? styles.active : styles.inactive}>
              <AntDesign
                name="home"
                size={focused ? 20 : 22}
                color={focused ? 'black' : 'white'}
              />
            </View>
          ),
        }} />
      <Tab.Screen name="Cart" component={CartScreen}
        options={{
          title: 'My Cart',
          tabBarIcon: ({ focused }) => (
            <View style={focused ? styles.active : styles.inactive}>
              <AntDesign
                name="shoppingcart"
                size={focused ? 20 : 22}
                color={focused ? 'black' : 'white'}
              />
            </View>
          ),
        }} />
      <Tab.Screen name="Checkout" component={CheckoutScreen}
        options={{
          title: 'Checkout',
          tabBarIcon: ({ focused }) => (
            <View style={focused ? styles.active : styles.inactive}>
              <MaterialIcons
                size={focused ? 20 : 22}
                color={focused ? 'black' : 'white'}
                name="shopping-cart-checkout"
              />
            </View>
          ),
        }} />
    </Tab.Navigator>
  )
}

export default BottomTab

const styles = StyleSheet.create({
  active: {
    width: 34,
    height: 34,
    borderRadius: 100,
    backgroundColor: Colors.primary500,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inactive: {
    width: 34,
    height: 34,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center'
  }
})