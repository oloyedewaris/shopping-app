import { TextInput, StyleSheet, TextInputProps, StyleProp, TextStyle, View, Text } from "react-native";
import { Colors } from "@/utils/styles";
import { ChangeEvent } from "react";

interface InputProps extends TextInputProps {
  style: StyleProp<TextStyle>;
  error?: string | false | undefined;
}

function Input({ style, error, ...rest }: InputProps) {
  return (
    <View>
      <TextInput
        style={[style, { borderColor: error ? 'red' : '#2A2A2A80' }]}
        {...rest}
      />
      {error && <Text style={{ fontSize: 10, fontWeight: '400', color: 'red' }}>{error}</Text>}
    </View>
  );
}

export default Input;

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
