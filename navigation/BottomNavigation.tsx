import { AntDesign } from '@expo/vector-icons';
import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Products from "@/screens/Products";
import CartScreen from "@/screens/CartScreen";
import { BottomNavigationList, ShopContextType, HomeNavigationList } from '@/types/all.type';
import { Colors } from '@/utils/styles';
import { Image, Platform, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import CheckoutScreen from '@/screens/Checkout';
import { MaterialIcons } from '@expo/vector-icons';
import { Fontisto, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useShop } from '@/contexts/CartContext';

const Tab = createBottomTabNavigator<BottomNavigationList>();

const BottomTab = () => {
  const navigation = useNavigation<NativeStackNavigationProp<HomeNavigationList>>();
  const { cart, saved } = useShop() as ShopContextType;

  const generalOptions: BottomTabNavigationOptions = {
    tabBarHideOnKeyboard: true,
    tabBarShowLabel: false,
    headerTitleAlign: "center",
    headerLeft: () => (
      <Image
        source={require("@/assets/images/malltiverse-logo.png")}
        style={{
          width: 99,
          height: 31,
          marginLeft: 15
        }}
      />
    ),
    tabBarStyle: {
      bottom: '2%',
      elevation: 10,
      width: '90%',
      marginHorizontal: 'auto',
      height: '7%',
      paddingTop: Platform.OS === 'android' ? 10 : 30,
      backgroundColor: "#2A2A2A",
      borderRadius: 20,
    },
  }

  return (
    <Tab.Navigator screenOptions={generalOptions} sceneContainerStyle={{ backgroundColor: 'white' }}>
      <Tab.Screen name="Products" component={Products}
        options={{
          title: 'Product List',
          tabBarIcon: ({ focused }) => (
            <View style={focused ? styles.active : styles.inactive}>
              <AntDesign
                name="home"
                size={focused ? 20 : 22}
                color={focused ? 'black' : 'white'}
              />
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity style={{ marginRight: 20 }} onPress={() => navigation.navigate('Saved')}>
              {(saved.length) ? (
                <View style={[styles.savedCountBG, { backgroundColor: 'black' }]}>
                  <Text style={styles.savedCount}>{saved.length}</Text>
                </View>
              ) : null}
              <FontAwesome name="bookmark" size={30} color={Colors.primary500} />
            </TouchableOpacity>
          ),
        }} />
      <Tab.Screen name="Cart" component={CartScreen}
        options={{
          title: 'My Cart',
          tabBarIcon: ({ focused }) => (
            <View style={focused ? styles.active : styles.inactive}>
              {(!focused && cart.length) ? (
                <View style={[styles.cartCountBG, { backgroundColor: Colors.primary500 }]}>
                  <Text style={styles.cartCount}>{cart.length}</Text>
                </View>
              ) : null}
              <AntDesign
                name="shoppingcart"
                size={focused ? 20 : 22}
                color={focused ? 'black' : 'white'}
              />
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity style={{ marginRight: 20 }} onPress={() => navigation.navigate('History')}>
              <Fontisto name="history" size={24} color={Colors.primary500} />
            </TouchableOpacity>
          ),
        }} />
      <Tab.Screen name="Checkout" component={CheckoutScreen}
        options={{
          title: 'Checkout',
          tabBarIcon: ({ focused }) => (
            <View style={focused ? styles.active : styles.inactive}>
              <MaterialIcons
                size={focused ? 20 : 22}
                color={focused ? 'black' : 'white'}
                name="shopping-cart-checkout"
              />
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity style={{ marginRight: 20 }} onPress={() => navigation.navigate('History')}>
              <Fontisto name="history" size={24} color={Colors.primary500} />
            </TouchableOpacity>
          ),
        }} />
    </Tab.Navigator>
  )
}

export default BottomTab

const styles = StyleSheet.create({
  active: {
    width: 34,
    height: 34,
    borderRadius: 100,
    backgroundColor: Colors.primary500,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  inactive: {
    width: 34,
    height: 34,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  cartCount: {
    fontSize: 11,
    color: 'black'
  },
  cartCountBG: {
    width: 15,
    height: 15,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 20
  },
  savedCountBG: {
    width: 15,
    height: 15,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: -5,
    top: -5,
    zIndex: 20
  },
  savedCount: {
    fontSize: 11,
    color: 'white'
  }
})