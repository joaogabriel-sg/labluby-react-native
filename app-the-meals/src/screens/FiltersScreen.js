import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View, Switch, Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch } from "react-redux";

import { CustomHeaderButton } from "../components";
import { setFilters } from "../store";
import { colors } from "../constants";

const FilterSwitch = ({ label, value, onChange }) => {
  return (
    <View style={styles.filterContainer}>
      <Text>{label}</Text>
      <Switch
        value={value}
        onValueChange={(newValue) => onChange(newValue)}
        trackColor={{ true: colors.primaryColor, false: "#aaaaaa" }}
        thumbColor={Platform.OS === "android" ? colors.primaryColor : ""}
      />
    </View>
  );
};

export function FiltersScreen({ navigation }) {
  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isLactoseFree, setIsLactoseFree] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);

  const dispatch = useDispatch();

  const saveFilters = useCallback(() => {
    const appliedFilters = {
      glutenFree: isGlutenFree,
      lactoseFree: isLactoseFree,
      vegan: isVegan,
      vegetarian: isVegetarian,
    };

    dispatch(setFilters(appliedFilters));
  }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian]);

  useEffect(() => {
    navigation.setParams({
      save: saveFilters,
    });
  }, [saveFilters]);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Available Filters / Restrictions</Text>

      <FilterSwitch
        label="Gluten-free"
        value={isGlutenFree}
        onChange={(newValue) => setIsGlutenFree(newValue)}
      />

      <FilterSwitch
        label="Lactose-free"
        value={isLactoseFree}
        onChange={(newValue) => setIsLactoseFree(newValue)}
      />

      <FilterSwitch
        label="Vegan"
        value={isVegan}
        onChange={(newValue) => setIsVegan(newValue)}
      />

      <FilterSwitch
        label="Vegetarian"
        value={isVegetarian}
        onChange={(newValue) => setIsVegetarian(newValue)}
      />
    </View>
  );
}

FiltersScreen.navigationOptions = (navigationData) => {
  return {
    headerTitle: "Filter Meals",
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
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Save"
          iconName="ios-save"
          onPress={navigationData.navigation.getParam("save")}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    margin: 20,
    fontFamily: "open-sans-bold",
    fontSize: 22,
    textAlign: "center",
  },
  filterContainer: {
    width: "80%",
    marginVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
