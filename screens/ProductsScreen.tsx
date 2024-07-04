import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import ProductList from '../components/ProductList';

interface Product {
  id: number;
  name: string;
  price: number;
}

const initialProducts: Product[] = [
  { id: 1, name: 'Bag', price: 29.99 },
  { id: 2, name: 'Shoe', price: 19.99 },
  { id: 3, name: 'Phone', price: 39.99 },
  { id: 4, name: 'Watch', price: 59.99 },
  { id: 5, name: 'Cap', price: 49.99 },
  { id: 6, name: 'Charger', price: 9.99 },
];

const ProductsScreen: React.FC = () => {
  const [products] = useState<Product[]>(initialProducts);
  const [checkoutItems, setCheckoutItems] = useState<Product[]>([]);

  const addToCheckout = (product: Product) => {
    setCheckoutItems([...checkoutItems, product]);
  };

  return (
    <View style={styles.container}>
      <ProductList products={products} addToCheckout={addToCheckout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default ProductsScreen;
