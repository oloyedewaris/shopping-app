import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const OrderSuccessScreen: React.FC = () => {
  const navigation = useNavigation<any>()
  return (
    <View style={styles.container}>
      <Text style={styles.message}>Order Successful!</Text>
      <Button title="Back to Products" onPress={() => navigation.navigate('Products')} />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  message: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default OrderSuccessScreen;
