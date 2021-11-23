import React from "react";
import { StyleSheet, View } from "react-native";

import { Header } from "./src/components";
import { StartGameScreen } from "./src/screens";

export default function App() {
  return (
    <View style={styles.screen}>
      <Header title="Guess a Number" />
      <StartGameScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
