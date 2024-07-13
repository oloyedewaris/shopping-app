import { Pressable, StyleSheet, Text, View, TextInput, Image, TouchableOpacity } from "react-native";
import { useCart } from "@/contexts/CartContext";
import Button from "@/components/Button";
import { useCallback, useState } from "react";
import { Colors } from "@/utils/styles";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { BottomNavigationList } from "@/types/navigation.type";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from '@expo/vector-icons';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Input from "@/components/Input";

function CheckoutScreen() {
  const navigation = useNavigation<BottomTabNavigationProp<BottomNavigationList>>();
  const { cart, clearCart }: any = useCart();
  const [step, setStep] = useState(1);
  const [pickupToUse, setPickUpToUse] = useState<any>(null);

  const deliverySchema = Yup.object().shape({
    delivery: Yup.string()
      .required('Required'),
    contact1: Yup.string()
      .required('Required')
      .min(11, 'Contact should be at least 11 digit'),
    contact2: Yup.string()
      .required('Required')
      .min(11, 'Contact should be at least 11 digit'),
  });

  const cardSchema = Yup.object().shape({
    cardNo: Yup.string()
      .required('Required')
      .min(15, 'Card no should be at least 15 digit'),
    expiry: Yup.string()
      .required('Required'),
    cvv: Yup.string()
      .required('Required')
      .min(3, 'CVV should be 3 digit')
      .max(3, 'CVV should be 3 digit'),
  });

  const firstFormik = useFormik({
    initialValues: {
      delivery: '',
      contact1: '',
      contact2: ''
    },
    validationSchema: deliverySchema,
    onSubmit: values => {
      // clearCart();
      // setStep(3)
      setStep(2);
    }
  })

  const secondFormik = useFormik({
    initialValues: {
      cardNo: '',
      expiry: '',
      cvv: ''
    },
    validationSchema: cardSchema,
    onSubmit: values => {
      clearCart();
      setStep(3);
    }
  })

  useFocusEffect(
    useCallback(() => {
      return () => {
        setStep(1);
        firstFormik.resetForm();
        secondFormik.resetForm();
      }
    }, [])
  )

  function handleNav() {
    navigation.navigate("Products");
  }

  const pickups = [
    { id: 1, address: 'Old Secretariat Complex, Area 1, Garki Abaji Abji' },
    { id: 2, address: 'Sokoto Street, Area 1, Garki Area 1 AMAC' },
  ]

  return (
    <View style={styles.container}>

      {step === 1 ? (
        <>
          {!cart?.length ? (
            <View style={styles.empty}>
              <Text style={styles.centerTxt}>No Item to Checkout</Text>
              <Pressable onPress={handleNav}>
                <Text style={styles.centerBtn}>Add Items</Text>
              </Pressable>
            </View>
          ) : (
            <>
              <Text style={{ fontSize: 14, fontWeight: 500 }}>Select how to receive your package(s)</Text>
              <View style={{ marginTop: 30 }}>
                <Text style={{ fontSize: 14, fontWeight: 500, }}>Pickup</Text>
                {pickups.map(pickup => (
                  <TouchableOpacity
                    key={pickup.id}
                    onPress={() => setPickUpToUse(pickup)}
                    style={{ marginTop: 10, flexDirection: 'row', gap: 10, alignItems: 'center' }}
                  >
                    <View style={[styles.checkBg, { borderColor: pickupToUse?.id === pickup.id ? Colors.primary500 : '#2A2A2AAB' }]}>
                      <View style={[styles.checkInner, { backgroundColor: pickupToUse?.id === pickup.id ? Colors.primary500 : '#2A2A2AAB' }]} />
                    </View>
                    <Text style={{ fontSize: 12, fontWeight: 400, color: '#2A2A2AAB' }}>{pickup.address}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View style={{ marginTop: 30 }}>
                <Text style={{ fontSize: 14, fontWeight: 500, }}>Delivery</Text>
                <Input
                  multiline
                  style={styles.input}
                  onBlur={firstFormik.handleBlur('delivery')}
                  error={firstFormik.touched.delivery && firstFormik.errors.delivery}
                  onChangeText={firstFormik.handleChange('delivery')}
                  value={firstFormik.values.delivery}
                />
              </View>
              <View style={{ marginTop: 30 }}>
                <Text style={{ fontSize: 14, fontWeight: 500, }}>Contact</Text>
                <Input
                  keyboardType="number-pad"
                  style={styles.inputSmall}
                  onBlur={firstFormik.handleBlur('contact1')}
                  placeholder="Phone number 1"
                  error={firstFormik.touched.contact1 && firstFormik.errors.contact1}
                  onChangeText={firstFormik.handleChange('contact1')}
                  value={firstFormik.values.contact1}
                />
                <Input
                  keyboardType="number-pad"
                  style={styles.inputSmall}
                  onBlur={firstFormik.handleBlur('contact2')}
                  placeholder="Phone number 2"
                  error={firstFormik.touched.contact2 && firstFormik.errors.contact2}
                  onChangeText={firstFormik.handleChange('contact2')}
                  value={firstFormik.values.contact2}
                />
              </View>
              <Button
                style={styles.paymentButton}
                onPress={firstFormik.handleSubmit}
              >Go to  Payment</Button>
            </>
          )}
        </>
      ) : step === 2 ? (
        <>
          <Image style={styles.card} source={require('@/assets/images/card.png')} />
          <View style={{ marginTop: 30 }}>
            <Text style={{ fontSize: 14, fontWeight: 500, }}>Card Number</Text>
            <Input
              style={styles.input}
              placeholder="0000 0000 0000 0000"
              keyboardType="number-pad"
              onBlur={secondFormik.handleBlur('cardNo')}
              error={secondFormik.touched.cardNo && secondFormik.errors.cardNo}
              onChangeText={secondFormik.handleChange('cardNo')}
              value={secondFormik.values.cardNo}
            />
          </View>

          <View style={{ flexDirection: 'row', gap: 20, justifyContent: 'space-between' }}>
            <View style={{ marginTop: 15, width: '46%' }}>
              <Text style={{ fontSize: 14, fontWeight: 500, }}>Expiry Date</Text>
              <Input
                style={styles.inputCardSmall}
                placeholder="MM/YY"
                keyboardType="number-pad"
                onBlur={secondFormik.handleBlur('expiry')}
                error={secondFormik.touched.expiry && secondFormik.errors.expiry}
                onChangeText={secondFormik.handleChange('expiry')}
                value={secondFormik.values.expiry}
              />
            </View>
            <View style={{ marginTop: 15, width: '46%' }}>
              <Text style={{ fontSize: 14, fontWeight: 500, }}>CVV</Text>
              <Input
                style={styles.inputCardSmall}
                placeholder="123"
                keyboardType="number-pad"
                onBlur={secondFormik.handleBlur('cvv')}
                error={secondFormik.touched.cvv && secondFormik.errors.cvv}
                onChangeText={secondFormik.handleChange('cvv')}
                value={secondFormik.values.cvv}
              />
            </View>
          </View>

          <Button style={styles.paymentButton} onPress={secondFormik.handleSubmit}>Make Payment</Button>
        </>
      ) : (
        <View style={styles.successContainer}>
          <Text style={{ fontSize: 16, fontWeight: 600, }}>Payment Successful</Text>

          <View style={{ gap: 10, alignItems: 'center' }}>
            <View style={styles.checkBox}>
              <FontAwesome5 name="check" size={50} color="white" />
            </View>
            <Text style={{ fontSize: 18, fontWeight: 600 }}>Payment Successful</Text>
            <Text style={{ fontSize: 14, fontWeight: 400 }}>Thanks for your purchase</Text>
          </View>

          <View />
        </View>
      )}
    </View>
  );
}

export default CheckoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginBottom: 40
  },
  successContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: "#fff",
    padding: 36,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  checkBox: {
    width: 92,
    height: 92,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: Colors.primary500
  },
  input: {
    borderWidth: 1,
    width: '100%',
    height: 60,
    borderColor: '#2A2A2A80',
    borderRadius: 9,
    marginTop: 10,
    padding: 10
  },
  inputSmall: {
    borderWidth: 1,
    width: '70%',
    height: 39,
    borderColor: '#2A2A2A80',
    borderRadius: 8,
    marginTop: 12,
    paddingHorizontal: 10
  },
  inputCardSmall: {
    borderWidth: 1,
    width: '100%',
    height: 39,
    borderColor: '#2A2A2A80',
    borderRadius: 8,
    marginTop: 12,
    paddingHorizontal: 10
  },
  card: {
    width: '100%',
    height: 217,
    borderRadius: 10
  },
  paymentButton: {
    borderRadius: 20,
    marginTop: 40,
    height: 48,
    width: '80%',
    marginHorizontal: 'auto'
  },
  checkBg: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    borderWidth: 1
  },
  checkInner: {
    width: 8,
    height: 8,
    borderRadius: 100,
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
