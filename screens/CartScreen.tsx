import { Pressable, FlatList, StyleSheet, Text, View } from "react-native";
import { useCart } from "@/contexts/CartContext";
import CartItem from "@/components/CartItem";
import Button from "@/components/Button";
import { formatCurrency } from "@/utils/helpers";
import { Colors } from "@/utils/styles";
import { useNavigation } from "@react-navigation/native";
import { BottomNavigationList } from "@/types/navigation.type";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

function CartScreen() {
  const navigation = useNavigation<BottomTabNavigationProp<BottomNavigationList>>();
  const { cart, totalPrice }: any = useCart();

  function checkout() {
    navigation.navigate('Checkout');
  }

  function handleNav() {
    navigation.navigate("Products");
  }

  if (!cart?.length)
    return (
      <View style={styles.empty}>
        <Text style={styles.centerTxt}>No Item in Cart</Text>
        <Pressable onPress={handleNav}>
          <Text style={styles.centerBtn}>Add Items </Text>
        </Pressable>
      </View>
    );

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        renderItem={({ item }) => <CartItem cartItem={item} />}
        keyExtractor={(item) => item.unique_id}
        ListFooterComponent={(
          <View style={styles.footer}>
            <Text style={{ fontSize: 16, fontWeight: 600, marginBottom: 20 }}>Shopping Summary</Text>
            <View style={styles.flex}>
              <Text style={styles.text}>Sub-Total</Text>
              <Text style={styles.header}>{formatCurrency(totalPrice)}</Text>
            </View>
            <View style={styles.flex}>
              <Text style={styles.text}>Delivery Fee</Text>
              <Text style={styles.header}>{formatCurrency(1500)}</Text>
            </View>
            <View style={{ width: '100%', marginVertical: 15, height: 1, borderColor: '#191919', borderWidth: 0.5 }} />
            <View style={styles.flex}>
              <Text style={styles.text}>Total Amount</Text>
              <Text style={styles.header}>{formatCurrency(1500 + Number(totalPrice))}</Text>
            </View>

            <Button style={{ borderRadius: 20, marginTop: 10 }} onPress={checkout}>Checkout</Button>
          </View>
        )}
      />
    </View>
  );
}

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 16,
    marginBottom: 40
  },
  footer: {
    marginTop: 30,
    paddingTop: 20,
    paddingHorizontal: 15,
    paddingBottom: 10,
    backgroundColor: '#EDEDEDAB'
  },
  btn: {
    height: 80,
  },
  header: {
    fontSize: 14,
    fontWeight: "600",
  },
  text: {
    fontSize: 12,
    fontWeight: '500',
    color: "#979797",
  },
  empty: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    gap: 8,
  },

  flex: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  centerTxt: {
    textAlign: "center",
  },
  centerBtn: {
    color: Colors.primary500,
    fontWeight: "700",
  },
});
