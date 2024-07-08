import React from "react";
import { StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";

interface HeaderProps {
  children: React.ReactNode,
  style?: ViewStyle,
  childrenStyle?: TextStyle
}

function Header({ children, style, childrenStyle }: HeaderProps) {
  return (
    <View style={style}>
      <Text style={[styles.header, childrenStyle]}>{children}</Text>
    </View>
  );
}

export default Header;

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
