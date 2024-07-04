import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

interface Product {
    id: number;
    name: string;
    price: number;
}

interface ProductItemProps {
    product: Product;
    addToCheckout: (product: Product) => void;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, addToCheckout }) => (
    <View style={styles.container}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        <Button title="Add to Checkout" onPress={() => addToCheckout(product)} />
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

export default ProductItem;
