import React from "react";
import { useSelector } from "react-redux";
import { StyleSheet, View, FlatList } from "react-native";

import { MealItem } from "./MealItem";

export function MealList({ listData, navigation }) {
  const favoriteMeals = useSelector((state) => state.meals.favoriteMeals);

  const renderMealItem = ({ item }) => {
    const isFavorite = favoriteMeals.some((meal) => meal.id === item.id);

    return (
      <MealItem
        title={item.title}
        duration={item.duration}
        complexity={item.complexity}
        affordability={item.affordability}
        image={item.imageUrl}
        onSelectMeal={() => {
          navigation.navigate({
            routeName: "MealDetail",
            params: {
              mealId: item.id,
              mealTitle: item.title,
              isFav: isFavorite,
            },
          });
        }}
      />
    );
  };

  return (
    <View style={styles.list}>
      <FlatList
        data={listData}
        keyExtractor={(item) => item.id}
        renderItem={renderMealItem}
        style={{ width: "100%" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
});
