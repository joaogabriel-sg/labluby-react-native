import React from "react";
import { StyleSheet, View, Platform } from "react-native";

import { TitleText } from ".";

import { colors } from "../constants";

export function Header({ title }) {
  return (
    <View
      style={{
        ...styles.headerBase,
        ...Platform.select({
          ios: styles.headerIOS,
          android: styles.headerAndroid,
        }),
      }}
    >
      <TitleText style={styles.title}>{title}</TitleText>
    </View>
  );
}

const styles = StyleSheet.create({
  headerBase: {
    width: "100%",
    height: 90,
    paddingTop: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  headerIOS: {
    backgroundColor: "#ffffff",
    borderBottomColor: "#cccccc",
    borderBottomWidth: 1,
  },
  headerAndroid: {
    backgroundColor: colors.primary,
    borderBottomColor: "#ffffff",
    borderBottomWidth: 0,
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
    color: Platform.OS === "ios" ? colors.primary : "#ffffff",
  },
});
