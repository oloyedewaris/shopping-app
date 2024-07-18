import { Image, StyleSheet, Text, View } from "react-native";
import { formatCurrency } from "@/utils/helpers";
import Header from "@/components/Header";
import { Colors } from "@/utils/styles";
import { HistoryType } from "@/types/all.type";
import { deliveryFee } from "@/utils/constants";

function HistoryItem({ historyItem }: { historyItem: HistoryType }) {

  const tableItems = [
    {
      key: 'Address',
      value: historyItem.address
    },
    {
      key: 'Pickup',
      value: historyItem.pickup
    },
    {
      key: 'Date',
      value: new Date(historyItem.time).toDateString()
    },
    {
      key: 'Contact 1',
      value: historyItem.contact1
    },
    {
      key: 'Contact 2',
      value: historyItem.contact2
    },

    {
      key: 'Sub-Total',
      value: formatCurrency(historyItem.totalAmount)
    },
    {
      key: 'Delivery Fee',
      value: formatCurrency(historyItem.deliveryFee)
    },
  ]


  return (
    <View style={styles.item}>
      <Text style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, textAlign: 'center' }}>Order Summary</Text>

      <Text style={{ fontSize: 16, fontWeight: 600, marginBottom: 10 }}>Ordered Items</Text>

      {historyItem.cart.map(item => (
        <View style={styles.rootContainer} key={item.unique_id}>
          <View style={styles.flex}>
            <View style={styles.nextFlex}>
              <Image
                source={{
                  uri: `https://api.timbu.cloud/images/${item.photos[0].url}`,
                }}
                style={styles.image}
                resizeMode="contain"
              />
              <View>
                <Header childrenStyle={styles.header}>{item.name}</Header>
                <Text style={styles.description}>{item.description}</Text>
                <View style={{ gap: 20, flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.price}>
                    {formatCurrency(item.current_price[0].NGN[0])}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      ))}

      <Text style={{ fontSize: 16, fontWeight: 600, marginBottom: 10, marginTop: 20 }}>Shopping Summary</Text>
      {tableItems.map(item => (
        <View style={styles.flex} key={item.key}>
          <Text style={styles.text}>{item.key}</Text>
          <Text style={styles.rightItem}>{item.value}</Text>
        </View>
      ))}
      <View style={{ width: '100%', marginVertical: 15, height: 1, borderColor: '#191919', borderWidth: 0.5 }} />
      <View style={styles.flex}>
        <Text style={styles.text}>Total Amount</Text>
        <Text style={styles.header}>{formatCurrency(deliveryFee + Number(historyItem.totalAmount))}</Text>
      </View>
    </View>
  );
}

export default HistoryItem;

const styles = StyleSheet.create({
  item: {
    marginTop: 20,
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
  rightItem: {
    fontSize: 14,
    fontWeight: "600",
    maxWidth: '60%',
    textAlign: 'right'
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
    marginTop: 10,
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
  rootContainer: {
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#2A2A2A1A',
    padding: 10,
  },
  price: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2A2A2A'
  },


  image: {
    width: 80,
    height: 80,
  },
  nextFlex: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  description: {
    fontSize: 10,
    fontWeight: "400",
    color: '#2A2A2A',
    marginBottom: 10
  }
});
