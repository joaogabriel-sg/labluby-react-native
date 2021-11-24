import React from "react";
import { StyleSheet, View } from "react-native";

import { TitleText } from ".";

import { colors } from "../constants";

export function Header({ title }) {
  return (
    <View style={styles.header}>
      <TitleText>{title}</TitleText>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.primary,
    width: "100%",
    height: 90,
    paddingTop: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
    color: "#000000",
  },
});
