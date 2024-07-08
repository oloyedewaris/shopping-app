import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { allProducts } from "@/utils/http";
import ProductItem from "@/components/ProductItem";
import PageLoader from "@/components/PageLoader";

function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getProducts() {
      setIsLoading(true);
      try {
        const data = await allProducts();
        setProducts(data.items);
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    getProducts();
  }, []);

  if (isLoading) return <PageLoader />;

  return (
    <FlatList
      data={products}
      renderItem={({ item }) => <ProductItem product={item} />}
      keyExtractor={(item: any) => `${item.unique_id}`}
    />
  );
}

export default Products;
