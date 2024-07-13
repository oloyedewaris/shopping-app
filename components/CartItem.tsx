import { Ionicons } from "@expo/vector-icons";
import { Alert, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { formatCurrency } from "@/utils/helpers";
import Header from "@/components/Header";
import { Colors } from "@/utils/styles";
import { useCart } from "@/contexts/CartContext";
import { AntDesign } from '@expo/vector-icons';

function CartItem({ cartItem }: { cartItem: any }) {
  const { increaseCount, decreaseCount, cart, removeFromCart }: any = useCart();

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

  const addMore = () => {
    increaseCount(cartItem.unique_id)
  }
  const removeFrom = () => {
    if (cartItem.count > 1)
      decreaseCount(cartItem.unique_id)
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
            <Text style={style.description}>{cartItem.description}</Text>
            <View style={{ gap: 20, flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity disabled={cartItem.count <= 1} onPress={removeFrom} style={style.box}>
                <Text>-</Text>
              </TouchableOpacity>
              <Text style={{ height: 20 }}>{cartItem?.count}</Text>
              <TouchableOpacity onPress={addMore} style={style.box}>
                <Text>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={style.endCon}>
          <Pressable style={style.btnRem} onPress={handleRemoveItem}>
            <Ionicons name="trash-outline" size={20} color="#2A2A2A99" />
          </Pressable>
          <Text style={style.price}>
            {formatCurrency(cartItem.current_price[0].NGN[0])}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default CartItem;

const style = StyleSheet.create({
  rootContainer: {
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#2A2A2A1A',
    padding: 10,
  },
  flex: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    width: '100%'
  },
  price: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2A2A2A'
  },

  btn: {
    color: "#d87d4a",
    fontSize: 18,
  },

  image: {
    width: 80,
    height: 80,
  },
  btnRem: {
    backgroundColor: "transparent",
    height: 40,
    shadowOpacity: 0.2,
    elevation: 3,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  nextFlex: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  header: {
    fontSize: 12,
    fontWeight: "600",
    color: '#2A2A2A',
    marginBottom: 4
  },
  description: {
    fontSize: 10,
    fontWeight: "400",
    color: '#2A2A2A',
    marginBottom: 10
  },
  endCon: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingVertical: 4
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    // paddingHorizontal: 16,
    paddingVertical: 8,
    // paddingTop: 2,
    color: Colors.primary500,
  },
  box: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
