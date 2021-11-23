import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors } from "../constants";

export function NumberContainer({ children }) {
  return (
    <View style={styles.container}>
      <Text style={styles.number}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderWidth: 2,
    borderColor: colors.accent,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  number: {
    fontSize: 22,
    color: colors.accent,
  },
});
