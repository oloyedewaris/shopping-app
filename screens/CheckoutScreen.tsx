import React, { useState } from 'react';
import { View, Button, StyleSheet, FlatList } from 'react-native';
import CheckoutItem from '../components/CheckoutItem';
import { useNavigation } from '@react-navigation/native';

interface Product {
    id: number;
    name: string;
    price: number;
}

const CheckoutScreen: React.FC = () => {
    const navigation = useNavigation<any>()
    const [checkoutItems, setCheckoutItems] = useState<Product[]>([]);

    const removeFromCheckout = (product: Product) => {
        setCheckoutItems(checkoutItems.filter(item => item.id !== product.id));
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={checkoutItems}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <CheckoutItem product={item} removeFromCheckout={removeFromCheckout} />}
                contentContainerStyle={styles.list}
            />
            <Button title="Place Order" onPress={() => navigation.navigate('OrderSuccess')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    list: {
        padding: 10,
    },
});

export default CheckoutScreen;
