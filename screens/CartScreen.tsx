import { Pressable, FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { useCart } from "@/contexts/CartContext";
import CartItem from "@/components/CartItem";
import Button from "@/components/Button";
import { formatCurrency } from "@/utils/helpers";
import { useState } from "react";
import CheckoutModal from "@/components/CheckoutModal";
import { Colors } from "@/utils/styles";
import { useNavigation } from "@react-navigation/native";
import { BottomNavigationList } from "@/types/navigation.type";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

function CartScreen() {
  const navigation = useNavigation<BottomTabNavigationProp<BottomNavigationList>>();
  const { cart, totalPrice }: any = useCart();

  const [isVisible, setIsVisible] = useState(false);

  function checkout() {
    setIsVisible(true);
  }

  function handleNav() {
    navigation.navigate("Products");
  }

  if (!cart?.length)
    return (
      <View style={styles.empty}>
        <Text style={styles.centerTxt}>Cart is empty</Text>
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
      />

      <CheckoutModal
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        navigation={navigation}
      />
      <View style={styles.footer}>
        <View style={styles.flex}>
          <Text style={styles.text}>Total</Text>
          <Text style={styles.header}>{formatCurrency(totalPrice)}</Text>
        </View>

        <Button onPress={checkout}>Checkout</Button>
      </View>
    </View>
  );
}

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 16,
  },
  footer: {
    height: 100,
    paddingTop: 10
  },
  btn: {
    height: 80,
  },
  header: {
    fontSize: 20,
    fontWeight: "600",
  },
  text: {
    fontSize: 20,
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
    flexDirection: "row",
    justifyContent: "space-between",
    // paddingHorizontal: 20,
    marginBottom: 10,
  },

  centerTxt: {
    textAlign: "center",
  },
  centerBtn: {
    color: Colors.primary500,
    fontWeight: "700",
  },
});
