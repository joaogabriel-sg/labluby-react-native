import { Platform } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import { colors } from "../constants";

import {
  CategoriesScreen,
  CategoryMealsScreen,
  MealDetailScreen,
} from "../screens";

const MealsNavigator = createStackNavigator(
  {
    Categories: {
      screen: CategoriesScreen,
      navigationOptions: {
        headerTitle: "Meals Categories",
      },
    },
    CategoryMeals: {
      screen: CategoryMealsScreen,
    },
    MealDetail: MealDetailScreen,
  },
  {
    initialRouteName: "Categories",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === "android" ? colors.primaryColor : "",
      },
      headerTintColor:
        Platform.OS === "android" ? "#ffffff" : colors.primaryColor,
    },
  }
);

export const AppRoutes = createAppContainer(MealsNavigator);
