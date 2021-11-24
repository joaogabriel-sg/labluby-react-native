import React from "react";
import { Button, StyleSheet, View, Image, Text } from "react-native";

import { TitleText, BodyText, MainButton } from "../components";
import { colors } from "../constants";

export function GameOverScreen({ roundsNumber, userNumber, onRestart }) {
  return (
    <View style={styles.screen}>
      <TitleText>The Game is Over!</TitleText>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/success.png")}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.resultContainer}>
        <BodyText style={styles.resultText}>
          Your phone needed <Text style={styles.highlight}>{roundsNumber}</Text>{" "}
          rounds to guess the number{" "}
          <Text style={styles.highlight}>{userNumber}</Text>.
        </BodyText>
      </View>
      <MainButton onPress={onRestart}>NEW GAME</MainButton>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderWidth: 3,
    borderColor: "#000000",
    borderRadius: 150,
    marginVertical: 30,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  resultContainer: {
    marginHorizontal: 30,
    marginVertical: 15,
  },
  resultText: {
    fontSize: 20,
    textAlign: "center",
  },
  highlight: {
    fontFamily: "open-sans-bold",
    color: colors.primary,
  },
});
