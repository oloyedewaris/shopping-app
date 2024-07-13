import { TextInput, StyleSheet, TextInputProps, StyleProp, TextStyle, View, Text } from "react-native";
import { Colors } from "@/utils/styles";
import { ChangeEvent } from "react";

interface InputProps extends TextInputProps {
  style: StyleProp<TextStyle>;
  onChangeText: (e: string | ChangeEvent<any>) => void;
  value: string;
  multiline?: boolean;
  error?: string | false | undefined;
  placeholder?: string;
}

function Input({ style, onChangeText, value, error, placeholder, onBlur, ...rest }: InputProps) {
  return (
    <View>
      <TextInput
        multiline
        onBlur={onBlur}
        placeholder={placeholder}
        style={[style, { borderColor: error ? 'red' : '#2A2A2A80' }]}
        onChangeText={onChangeText}
        value={value}
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
