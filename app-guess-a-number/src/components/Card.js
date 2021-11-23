import React from "react";
import { StyleSheet, View } from "react-native";

export function Card({ style, children }) {
  return <View style={{ ...styles.card, ...style }}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
  },
});
