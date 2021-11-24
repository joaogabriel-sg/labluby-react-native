import React from "react";
import { StyleSheet, Text, View } from "react-native";

export function BodyText({ style, children }) {
  return <Text style={{ ...styles.body, ...style }}>{children}</Text>;
}

const styles = StyleSheet.create({
  body: {
    fontFamily: "open-sans",
  },
});
