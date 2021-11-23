import React from "react";
import { StyleSheet, TextInput } from "react-native";

export function Input({ style, ...props }) {
  return <TextInput {...props} style={{ ...styles.input, ...style }} />;
}

const styles = StyleSheet.create({
  input: {
    height: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#9a9a9a",
    marginVertical: 10,
  },
});
