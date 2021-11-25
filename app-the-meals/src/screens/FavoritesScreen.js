import React from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { CustomHeaderButton, MealList } from "../components";
import { MEALS } from "../data";

export function FavoritesScreen({ navigation }) {
  const favoriteMeals = MEALS.filter((meal) => ["m1", "m2"].includes(meal.id));

  return <MealList listData={favoriteMeals} navigation={navigation} />;
}

FavoritesScreen.navigationOptions = (navigationData) => {
  return {
    headerTitle: "Your Favorites",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navigationData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};
