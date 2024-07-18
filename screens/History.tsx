import { FlatList, StyleSheet, Text, View } from "react-native";
import { useShop } from "@/contexts/CartContext";
import { Colors } from "@/utils/styles";
import { ShopContextType } from "@/types/all.type";
import HistoryItem from "@/components/HistoryItem";

function HistoryScreen() {
  const { history } = useShop() as ShopContextType;

  if (!history?.length)
    return (
      <View style={styles.empty}>
        <Text style={styles.centerTxt}>No order yet</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <FlatList
        data={history}
        renderItem={({ item }) => <HistoryItem historyItem={item} />}
        keyExtractor={(item) => `${item.timestamp}`}
      />
    </View>
  );
}

export default HistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: 40,
    padding: 16,
    backgroundColor: 'white'
  },
  empty: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    gap: 8,
  },
  centerTxt: {
    textAlign: "center",
  },
});
