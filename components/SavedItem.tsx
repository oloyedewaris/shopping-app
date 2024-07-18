import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { formatCurrency } from "@/utils/helpers";
import Header from "@/components/Header";
import { Colors } from "@/utils/styles";
import { useShop } from "@/contexts/CartContext";
import { AntDesign } from '@expo/vector-icons';
import { ShopContextType, ProductType, HomeNavigationList } from "@/types/all.type";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

function SavedItem({ savedItem }: { savedItem: ProductType }) {
  const { removeFromSaved } = useShop() as ShopContextType;
  const navigation = useNavigation<NativeStackNavigationProp<HomeNavigationList>>();

  function viewProduct() {
    navigation.navigate("Product", { product: savedItem });
  }

  function handleRemoveItem() {
    removeFromSaved(savedItem.unique_id)
  }

  return (
    <TouchableOpacity onPress={viewProduct} style={style.rootContainer}>
      <View style={style.flex}>
        <View style={style.nextFlex}>
          <Image
            source={{
              uri: `https://api.timbu.cloud/images/${savedItem.photos[0].url}`,
            }}
            style={style.image}
            resizeMode="contain"
          />
          <View>
            <Header childrenStyle={style.header}>{savedItem.name}</Header>
            <Text style={style.description}>{savedItem.description}</Text>
            <View style={{ gap: 20, flexDirection: 'row', alignItems: 'center' }}>
              <Text style={style.price}>
                {formatCurrency(savedItem.current_price[0].NGN[0])}
              </Text>
            </View>
          </View>
        </View>
        <View style={style.endCon}>
          <TouchableOpacity style={style.btnRem} onPress={handleRemoveItem}>
            <AntDesign name="close" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default SavedItem;

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
