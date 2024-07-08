import { Ionicons } from "@expo/vector-icons";
import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { formatCurrency } from "@/utils/helpers";
import Header from "@/components/Header";
import { Colors } from "@/utils/styles";
import { useCart } from "@/contexts/CartContext";

function CartItem({ cartItem }: { cartItem: any }) {
  const { removeFromCart }: any = useCart();

  function handleRemoveItem() {
    Alert.alert(
      "Remove Item",
      `Are you sure you want to remove ${cartItem.name} from cart?`,
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "YES!!",
          onPress: () => removeFromCart(cartItem.unique_id),
        },
      ],
      { cancelable: true }
    );
  }

  return (
    <View style={style.rootContainer}>
      <View style={style.flex}>
        <View style={style.nextFlex}>
          <Image
            source={{
              uri: `https://api.timbu.cloud/images/${cartItem.photos[0].url}`,
            }}
            style={style.image}
          />
          <View>
            <Header childrenStyle={style.header}>{cartItem.name}</Header>
            <Text style={style.text}>
              {formatCurrency(cartItem.current_price[0].GBP[0])}
            </Text>
          </View>
        </View>
        <Pressable style={style.btnRem} onPress={handleRemoveItem}>
          <Ionicons name="remove" size={24} color="black" />
        </Pressable>
      </View>
    </View>
  );
}

export default CartItem;

const style = StyleSheet.create({
  rootContainer: {
    marginBottom: 8,
    padding: 16,
  },
  flex: {
    flexDirection: "row",
    justifyContent: "space-between",
    // paddingHorizontal: 20,
    marginBottom: 10,
  },

  btn: {
    color: "#d87d4a",
    fontSize: 18,
  },

  image: {
    width: 80,
    height: 80,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    borderRadius: 4,
    marginRight: 8,
  },
  btnRem: {
    backgroundColor: "#f1f1f1",
    height: 40,
    shadowOpacity: 0.2,
    elevation: 3,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  nextFlex: {
    flexDirection: "row",
    gap: 2,
    alignItems: "center",
  },
  header: {
    fontSize: 20,
    fontWeight: "400",
    width: 180,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    // paddingHorizontal: 16,
    paddingVertical: 8,
    // paddingTop: 2,
    color: Colors.primary500,
  },
});
