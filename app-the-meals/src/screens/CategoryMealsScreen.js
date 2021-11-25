import React from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";

import { DefaultText, MealList } from "../components";
import { CATEGORIES } from "../data";

export function CategoryMealsScreen({ navigation }) {
  const availableMeals = useSelector((state) => state.meals.filteredMeals);

  const categoryId = navigation.getParam("categoryId");
  const displayedMeals = availableMeals.filter(
    (meal) => meal.categoryIds.indexOf(categoryId) >= 0
  );

  if (displayedMeals.length === 0)
    return (
      <View style={styles.content}>
        <DefaultText>No meals found, maybe check your filters?</DefaultText>
      </View>
    );

  return <MealList listData={displayedMeals} navigation={navigation} />;
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
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
