import React, { ReactNode } from "react";
import { StyleSheet, View, ViewProps } from "react-native";

interface Props extends ViewProps {
  children: ReactNode | ReactNode[];
}

export function Card({ children, style }: Props) {
  const stylesCard = Object.assign({}, styles.card, style);

  return <View style={stylesCard}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
});
