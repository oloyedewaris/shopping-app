import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

interface Product {
    id: number;
    name: string;
    price: number;
}

interface CheckoutItemProps {
    product: Product;
    removeFromCheckout: (product: Product) => void;
}

const CheckoutItem: React.FC<CheckoutItemProps> = ({ product, removeFromCheckout }) => (
    <View style={styles.container}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        <Button title="Remove" onPress={() => removeFromCheckout(product)} />
    </View>
);

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    name: {
        fontSize: 18,
    },
    price: {
        fontSize: 16,
        color: '#888',
    },
});

export default CheckoutItem;
