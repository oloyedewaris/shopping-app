import { Image, Modal, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useShop } from "@/contexts/CartContext";
import Header from "@/components/Header";
import { formatCurrency } from "@/utils/helpers";
import Button from "@/components/Button";
import { Colors } from "@/utils/styles";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { BottomNavigationList } from "@/types/all.type";

interface ModalProps {
  isVisible: boolean;
  setIsVisible: Function;
  navigation: BottomTabNavigationProp<BottomNavigationList>
}

function CheckoutModal({ isVisible, setIsVisible, navigation }: ModalProps) {
  function handleCheckout() {
    setIsVisible(false);
    navigation.navigate("Products");
  }

  return (
    <Modal animationType="slide" visible={isVisible}>
      <SafeAreaView >

      </SafeAreaView>
    </Modal>
  );
}

export default CheckoutModal;

const style = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: "#fff",
    padding: 16,
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  text2: {
    fontSize: 20,
    marginVertical: 10,
    color: "#979797",
  },

  image: {
    height: 60,
    width: 60,
    marginBottom: 18,
  },

  flexCont: {
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: "#d1d1d1",
    padding: 20,
  },
  flexCon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  flex: {
    flexDirection: "row",
    alignItems: "center",
  },

  btn: {
    fontSize: 18,
  },

  smallImage: {
    width: 40,
    height: 30,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    borderRadius: 2,
    marginRight: 8
  },
  btnRem: {
    backgroundColor: "#f1f1f1",
    height: 40,
    shadowOpacity: 0.2,
    elevation: 3,
  },

  nextFlex: {
    flexDirection: "row",
    gap: 2,
    alignItems: "center",
  },
  header: {
    fontSize: 20,
    fontWeight: "600",
    marginRight: 8
  },
  text: {
    fontSize: 16,
    color: "#979797",
  },

  moreItem: {
    alignItems: "center",
    justifyContent: "center",
    borderTopColor: "#979797",
    borderTopWidth: 1,
    paddingVertical: 12,
  },

  totalTxt: {
    color: Colors.primary100,
    fontWeight: "400",
  },
  total: {
    color: "#fff",
  },

  headerDark: {
    backgroundColor: Colors.primary900,
    padding: 20,
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
    marginBottom: 16,
  },
  headerBig: {
    fontSize: 32,
  },
});
