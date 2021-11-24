import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import { colors } from "../constants";

export function MainButton({ onPress, children }) {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    fontFamily: "open-sans",
    fontSize: 18,
    color: "#ffffff",
  },
});
