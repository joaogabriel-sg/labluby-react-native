import React from "react";
import { Platform } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import {
  ProductDetailScreen,
  ProductsOverviewScreen,
  CartScreen,
} from "../screens";
import { CustomHeaderButton } from "../components";

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
        options={({ navigation }) => ({
          title: "All Products",
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item
                title="Cart"
                iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
                onPress={() => navigation.navigate("CartScreen")}
              />
            </HeaderButtons>
          ),
        })}
      />
      <ShopNavigator.Screen
        name="ProductDetailScreen"
        component={ProductDetailScreen}
        options={({ route }) => ({ title: route.params.productTitle })}
      />
      <ShopNavigator.Screen
        name="CartScreen"
        component={CartScreen}
        options={{ title: "Cart" }}
      />
    </ShopNavigator.Navigator>
  );
}
