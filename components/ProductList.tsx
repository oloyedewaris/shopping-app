import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ProductItem from './ProductItem';

interface Product {
    id: number;
    name: string;
    price: number;
}

interface ProductListProps {
    products: Product[];
    addToCheckout: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, addToCheckout }) => (
    <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ProductItem product={item} addToCheckout={addToCheckout} />}
        contentContainerStyle={styles.list}
    />
);

const styles = StyleSheet.create({
    list: {
        padding: 10,
    },
});

export default ProductList;
