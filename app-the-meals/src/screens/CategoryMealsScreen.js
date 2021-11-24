import React from "react";
import { StyleSheet, Text, View, Button, Platform } from "react-native";

import { colors } from "../constants";
import { CATEGORIES } from "../data";

export function CategoryMealsScreen({ navigation }) {
  const categoryId = navigation.getParam("categoryId");

  const selectedCategory = CATEGORIES.find(
    (category) => category.id === categoryId
  );

  return (
    <View style={styles.screen}>
      <Text>The Category Meal Screen!</Text>
      <Text>{selectedCategory.title}</Text>
      <Button
        title="Go to Details!"
        onPress={() => navigation.navigate({ routeName: "MealDetail" })}
      />
      <Button title="Go Back" onPress={() => navigation.pop()} />
    </View>
  );
}

CategoryMealsScreen.navigationOptions = (navigationData) => {
  const categoryId = navigationData.navigation.getParam("categoryId");

  const selectedCategory = CATEGORIES.find(
    (category) => category.id === categoryId
  );

  return {
    headerTitle: selectedCategory.title,
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
