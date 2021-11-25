import React from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { StyleSheet, FlatList } from "react-native";

import { CategoryGridTile, CustomHeaderButton } from "../components";
import { CATEGORIES } from "../data";

export function CategoriesScreen({ navigation }) {
  const renderGridItem = ({ item }) => {
    return (
      <CategoryGridTile
        title={item.title}
        color={item.color}
        onSelect={() =>
          navigation.navigate({
            routeName: "CategoryMeals",
            params: {
              categoryId: item.id,
            },
          })
        }
      />
    );
  };

  return (
    <FlatList data={CATEGORIES} renderItem={renderGridItem} numColumns={2} />
  );
}

CategoriesScreen.navigationOptions = (navigationData) => {
  return {
    headerTitle: "Meals Categories",
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

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
