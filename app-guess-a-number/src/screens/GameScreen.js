import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, View, Text, Alert, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { NumberContainer, Card, MainButton, BodyText } from "../components";
import { defaultStyles } from "../constants";

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randomNumber = Math.floor(Math.random() * (max - min)) + min;

  return randomNumber === exclude
    ? generateRandomBetween(min, max, exclude)
    : randomNumber;
};

const renderListItem = (listLength, itemData) => (
  <View style={styles.listItem}>
    <BodyText>#{listLength - itemData.index}</BodyText>
    <BodyText>{itemData.item}</BodyText>
  </View>
);

export function GameScreen({ userChoice, onGameOver }) {
  const initialGuess = generateRandomBetween(1, 100, userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  useEffect(() => {
    if (currentGuess === userChoice) onGameOver(pastGuesses.length);
  }, [currentGuess, pastGuesses, userChoice, onGameOver]);

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < userChoice) ||
      (direction === "greater" && currentGuess > userChoice)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [
        {
          text: "Sorry",
          style: "cancel",
        },
      ]);
      return;
    }

    if (direction === "lower") currentHigh.current = currentGuess;
    else currentLow.current = currentGuess + 1;

    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    setPastGuesses((prevPastGuesses) => [
      nextNumber.toString(),
      ...prevPastGuesses,
    ]);
  };

  return (
    <View style={styles.screen}>
      <Text style={defaultStyles.title}>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={nextGuessHandler.bind(this, "lower")}>
          <Ionicons name="md-remove" size={24} color="#ffffff" />
        </MainButton>
        <MainButton onPress={nextGuessHandler.bind(this, "greater")}>
          <Ionicons name="md-add" size={24} color="#ffffff" />
        </MainButton>
      </Card>
      <View style={styles.listContainer}>
        <FlatList
          data={pastGuesses}
          keyExtractor={(item) => item}
          renderItem={renderListItem.bind(this, pastGuesses.length)}
          contentContainerStyle={styles.list}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
    width: 300,
    maxWidth: "80%",
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  listContainer: {
    width: "60%",
    flex: 1,
  },
  list: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  listItem: {
    backgroundColor: "#ffffff",
    width: "100%",
    padding: 15,
    borderWidth: 1,
    borderColor: "#cccccc",
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
