import { TouchableOpacity, StyleSheet, Text, TextStyle, ViewStyle } from "react-native";
import { Colors } from "@/utils/styles";
import { TouchableOpacityProps } from "react-native-gesture-handler";

interface BottonProps extends TouchableOpacityProps {
  children: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
  onPress: () => void;
}


function Button({ children, style, textStyle, onPress, ...rest }: BottonProps) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]} {...rest}>
      <Text style={[styles.text, textStyle]}>{children}</Text>
    </TouchableOpacity>
  );
}

export default Button;

const styles = StyleSheet.create({
  button: {
    // flex: 1,
    height: 60,
    borderRadius: 4,
    backgroundColor: Colors.primary500,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
    // textTransform: "uppercase",
  },
});
