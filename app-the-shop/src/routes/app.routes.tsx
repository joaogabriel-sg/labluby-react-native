import React from "react";
import { Platform } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { ProductDetailScreen, ProductsOverviewScreen } from "../screens";

import { colors } from "../shared/constants";

import { ShopNavigatorParamList } from "./types";

const ShopNavigator = createNativeStackNavigator<ShopNavigatorParamList>();

export function AppRoutes() {
  return (
    <ShopNavigator.Navigator
      screenOptions={{
        headerTintColor: Platform.OS === "android" ? "#ffffff" : colors.primary,
        headerStyle: {
          backgroundColor: Platform.OS === "android" ? colors.primary : "",
        },
        headerTitleStyle: {
          fontFamily: "open-sans-bold",
        },
        headerBackTitleStyle: {
          fontFamily: "open-sans-bold",
        },
      }}
    >
      <ShopNavigator.Screen
        name="ProductsOverview"
        component={ProductsOverviewScreen}
        options={{ title: "All Products" }}
      />
      <ShopNavigator.Screen
        name="ProductDetailScreen"
        component={ProductDetailScreen}
        options={({ route }) => ({ title: route.params.productTitle })}
      />
    </ShopNavigator.Navigator>
  );
}
