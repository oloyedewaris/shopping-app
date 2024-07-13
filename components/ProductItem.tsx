import { Alert, Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";

import Button from "@/components/Button";
import { Colors } from "@/utils/styles";
import { formatCurrency } from "@/utils/helpers";
import { useNavigation } from "@react-navigation/native";
import { useCart } from "@/contexts/CartContext";
import Toast from "react-native-toast-message";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeNavigationList } from "@/types/navigation.type";
import { EvilIcons } from '@expo/vector-icons';

function ProductItem({ product }: { product: any }) {
  const navigation = useNavigation<NativeStackNavigationProp<HomeNavigationList>>();
  const { addToCart, cart, removeFromCart }: any = useCart();

  function viewProduct() {
    navigation.navigate("Product", { product });
  }

  const isInCart = cart.some((crt: { unique_id: string }) => crt.unique_id === product.unique_id);

  function handleRemoveItem() {
    removeFromCart(product.unique_id);
    Toast.show({
      type: "error",
      text1: "Item Removed",
      text2: `${product.name.toUpperCase()} removed from cart `,
    });
  }

  function handleAddToCart() {
    if (!isInCart) {
      addToCart(product);

      Toast.show({
        type: "success",
        text1: "Item Added",
        text2: `${product.name.toUpperCase()} successfully added to cart `,
      });
    } else {
      Alert.alert(
        "Product already added",
        ` ${product.name} is already in the cart`,
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Remove item",
            onPress: () => handleRemoveItem(),
          },
        ],
        { cancelable: true }
      );
    }
  }

  return (
    <View style={styles.product}>
      <TouchableOpacity
      // onPress={viewProduct}
      >
        <View style={styles.imageCon}>
          {product.photos[0]?.url && <Image
            source={{
              uri: `https://api.timbu.cloud/images/${product.photos[0]?.url}`,
            }}
            style={styles.image}
          />}
        </View>
      </TouchableOpacity>
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.description} numberOfLines={1}>{product.description}</Text>
      <View style={styles.star}>
        {Array(5).fill(1).map(star => (
          <EvilIcons key={Math.random()} name="star" size={17} color="#FFC657" />
        ))}
      </View>
      <Text style={styles.price}>
        {formatCurrency(product.current_price[0]?.NGN[0])}
      </Text>
      <Button
        style={styles.btnStyle}
        textStyle={styles.btnTxt}
        onPress={handleAddToCart}
      >
        {isInCart ? "Remove" : "Add To Cart"}
      </Button>
    </View>
  );
}

export default ProductItem;

const styles = StyleSheet.create({
  product: {
    marginHorizontal: 10,
    flex: 1,
    marginBottom: 24,
    width: 200,
    height: 100
  },
  imageCon: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 184,
    backgroundColor: '#EDEDEDAB'
  },
  star: {
    flexDirection: 'row',
    gap: 0,
    marginBottom: 4,
  },
  name: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 2,
    paddingVertical: 4,
    paddingTop: 12,
    textTransform: "uppercase",
    color: Colors.primary800,
  },
  description: {
    fontSize: 12,
    fontWeight: "400",
    marginBottom: 2,
    paddingVertical: 4,
    paddingTop: 0,
    textTransform: "uppercase",
    color: Colors.primary800,
  },
  price: {
    fontSize: 13,
    fontWeight: "500",
    paddingVertical: 8,
    paddingTop: 2,
    color: Colors.primary500,
  },
  image: {
    height: 94,
    minWidth: 94,
    width: 'auto',
    borderRadius: 4,
    // elevation: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  btnStyle: {
    backgroundColor: 'transparent',
    borderRadius: 14,
    borderColor: Colors.primary500,
    borderWidth: 1,
    height: 38,
    width: 93
  },
  btnTxt: {
    color: 'black',
    fontWeight: "400",
    fontSize: 12
  },
});
