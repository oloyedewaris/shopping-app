import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import OrderSuccessScreen from './screens/OrderSuccessScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="OrderSuccess" component={OrderSuccessScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
