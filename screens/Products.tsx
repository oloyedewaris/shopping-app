import { useEffect, useState } from "react";
import { FlatList, ImageBackground, ScrollView, StyleSheet, Text, View } from "react-native";
import { allProducts } from "@/utils/http";
import ProductItem from "@/components/ProductItem";
import PageLoader from "@/components/PageLoader";
import { CategoryType, ProductType } from "@/types/all.type";

function ProductsScren() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getProducts() {
      setIsLoading(true);
      try {
        const data = await allProducts();
        setProducts(data.items);
      } catch (error) {
        console.error((error as Error).message);
      } finally {
        setIsLoading(false);
      }
    }
    getProducts();
  }, []);

  if (isLoading) return <PageLoader />;

  const categories: CategoryType[] = [
    { title: "women’s fashion", products: [] },
    { title: 'tech gadget', products: [] },
    { title: "men’s fashion", products: [] }
  ];


  let fetchedCategories: CategoryType[] = [];

  categories.forEach(category => {
    const categoryProducts = products.filter((product: ProductType) => product?.categories[0]?.name === category?.title)
    fetchedCategories.push({ ...category, products: categoryProducts });
  })

  return (
    <View style={{ marginHorizontal: 10 }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        <ImageBackground borderRadius={10} source={require("@/assets/images/header-image.png")}>
          <View style={styles.header}>
            <Text style={styles.headerText}>
              Premium Sound,
              Premium Savings
            </Text>
            <Text style={styles.headerSubText}>
              Limited offer, hope on and get yours now
            </Text>
          </View>
        </ImageBackground>
        {fetchedCategories.map((category: CategoryType) => (
          <View key={category?.title} style={{ marginTop: 40, paddingBottom: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: '600', textTransform: 'capitalize' }}>{category?.title}</Text>
            <FlatList
              style={{ marginTop: 10, }}
              contentContainerStyle={{ paddingBottom: 200 }}
              data={category?.products || []}
              horizontal
              renderItem={({ item }) => <ProductItem product={item} />}
              keyExtractor={(item: ProductType) => `${item.unique_id}`}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

export default ProductsScren;


const styles = StyleSheet.create({
  header: {
    height: 150,
    borderRadius: 100,
    width: '100%',
    justifyContent: 'center',
    padding: 20
  },
  headerText: {
    color: '#FAFAFA',
    textAlign: 'left',
    fontSize: 20,
    fontWeight: '600',
    maxWidth: 221
  },
  headerSubText: {
    color: '#FAFAFA',
    textAlign: 'left',
    fontSize: 12,
    fontWeight: '500',
    maxWidth: 221
  }
})