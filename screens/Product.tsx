import { Alert, Image, SafeAreaView, StyleSheet, Text, View } from "react-native";

import { Colors } from "@/utils/styles";
import { formatCurrency } from "@/utils/helpers";
import Button from "@/components/Button";
import { RouteProp, useRoute } from "@react-navigation/native";
import Header from "@/components/Header";
import { useShop } from "@/contexts/CartContext";
import Toast from "react-native-toast-message";
import { ShopContextType, HomeNavigationList, ProductType } from "@/types/all.type";

function ProductScreen() {
  const route = useRoute<RouteProp<HomeNavigationList>>();
  const product = route.params?.product;

  const { addToCart, cart, removeFromCart } = useShop() as ShopContextType;

  const isInCart = cart.some((crt: { unique_id: string }) => crt.unique_id === product?.unique_id);

  function handleRemoveItem() {
    if (!product?.unique_id)
      return
    removeFromCart(product?.unique_id);
    Toast.show({
      type: "error",
      text1: "Item Removed",
      text2: `${product?.name.toUpperCase()} removed from cart `,
    });
  }

  function handleAddToCart() {
    if (!product)
      return

    if (!isInCart) {
      addToCart(product);

      Toast.show({
        type: "success",
        text1: "Item Added",
        text2: `${product?.name.toUpperCase()} successfully added to cart `,
      });
    } else {
      Alert.alert(
        "Product already added",
        ` ${product?.name} is already in the cart`,
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
    <SafeAreaView style={styles.product}>
      {product?.photos[0]?.url && <Image
        resizeMode="contain"
        source={{
          uri: `https://api.timbu.cloud/images/${product?.photos[0].url}`,
        }}
        style={styles.image}
      />}
      <Text style={styles.name}>{product?.name}</Text>
      <Text style={styles.price}>
        {formatCurrency(product?.current_price[0]?.NGN[0] || 0)}
      </Text>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.btnStyle}
          textStyle={styles.btnTxt}
          onPress={handleAddToCart}
        >
          {isInCart ? "Remove" : "Add To Cart"}
        </Button>
      </View>
      <Header>Description:</Header>
      <Text style={styles.description}>{product?.description}</Text>
    </SafeAreaView>
  );
}

export default ProductScreen;

const styles = StyleSheet.create({
  product: {
    margin: 16,
    flex: 1,
    // alignItems: "center",
    marginBottom: 24,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    paddingVertical: 4,
    paddingTop: 16,
    textTransform: "uppercase",
    color: Colors.primary800,
    // textAlign: "center",
  },
  price: {
    fontSize: 16,
    fontWeight: 400,
    paddingVertical: 8,
    paddingTop: 2,
    color: Colors.primary500,
  },
  image: {
    alignSelf: 'center',
    height: 300,
    width: "80%",
    borderRadius: 4,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 8,
    gap: 20,
  },
  description: {
    marginVertical: 16,
    fontSize: 18,
    lineHeight: 24,
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
