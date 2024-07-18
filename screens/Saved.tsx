import { FlatList, StyleSheet, Text, View } from "react-native";
import { useShop } from "@/contexts/CartContext";
import { Colors } from "@/utils/styles";
import { ShopContextType } from "@/types/all.type";
import SavedItem from "@/components/SavedItem";

function SavedScreen() {
  const { saved } = useShop() as ShopContextType;

  if (!saved?.length)
    return (
      <View style={styles.empty}>
        <Text style={styles.centerTxt}>No Saved Item yet</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <FlatList
        data={saved}
        renderItem={({ item }) => <SavedItem savedItem={item} />}
        keyExtractor={(item) => item.unique_id}
      />
    </View>
  );
}

export default SavedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: 40,
    padding: 16
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
