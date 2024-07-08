import { TouchableOpacity, StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";
import { Colors } from "@/utils/styles";

interface BottonProps {
  children: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
  onPress: () => void;
}


function Button({ children, style, textStyle, onPress }: BottonProps) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <Text style={[styles.text, textStyle]}>{children}</Text>
    </TouchableOpacity>
  );
}

export default Button;

const styles = StyleSheet.create({
  button: {
    flex: 1,
    height: 60,
    borderRadius: 4,
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: Colors.primary500,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
