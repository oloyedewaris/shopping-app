import React from 'react';
import { Platform, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProductsScreen from './ProductsScreen';
import CheckoutScreen from './CheckoutScreen';

const Tab = createBottomTabNavigator();

const HomeScreen: React.FC = () => {
  const generalOptions = {
    tabBarHideOnKeyboard: true,
    tabBarStyle: {
      // display: "flex",
      // position: "absolute",
      bottom: 0.9,
      left: 0,
      right: 0,
      elevation: 10,
      backgroundColor: "#FFFFFF",
      // width: "100%",
      // height: 55,
    },
    tabBarShowLabel: false,
    headerShown: false,
  }


  return (
    <Tab.Navigator screenOptions={generalOptions} >
      <Tab.Screen name="Products" component={ProductsScreen} options={{
        tabBarIcon: ({ focused }) => (
          <View
            style={{
              top: Platform.OS === "ios" ? 10 : 0,
            }}
          >
            <AntDesign
              name="home"
              size={22}
              color={focused ? 'blue' : "gray"}
            />
          </View>
        )
      }} />
      <Tab.Screen name="Checkout" component={CheckoutScreen} options={{
        tabBarIcon: ({ focused }) => (
          <View
            style={{
              top: Platform.OS === "ios" ? 10 : 0,
            }}
          >
            <AntDesign
              name="shoppingcart"
              size={22}
              color={focused ? 'blue' : "gray"}
            />
          </View>
        )
      }} />
    </Tab.Navigator>
  )
}

export default HomeScreen