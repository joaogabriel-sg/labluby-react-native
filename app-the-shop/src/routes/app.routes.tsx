import React from "react";
import { Platform } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";

import {
  CartScreen,
  EditProductScreen,
  OrdersScreen,
  ProductDetailScreen,
  ProductsOverviewScreen,
  UserProductsScreen,
} from "../screens";
import { CustomHeaderButton } from "../components";

import { colors } from "../shared/constants";

import { RootNavigatorParamList } from "./types";

const ProductsNavigator = createNativeStackNavigator<RootNavigatorParamList>();

function ProductsNavigatorScreens() {
  return (
    <ProductsNavigator.Navigator
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
      <ProductsNavigator.Screen
        name="ProductsOverview"
        component={ProductsOverviewScreen}
        options={({ navigation }) => ({
          title: "All Products",
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item
                title="Menu"
                iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
                onPress={() => navigation.toggleDrawer()}
              />
            </HeaderButtons>
          ),
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
      <ProductsNavigator.Screen
        name="ProductDetailScreen"
        component={ProductDetailScreen}
        options={({ route }) => ({ title: route.params.productTitle })}
      />
      <ProductsNavigator.Screen
        name="CartScreen"
        component={CartScreen}
        options={{ title: "Your Cart" }}
      />
    </ProductsNavigator.Navigator>
  );
}

const OrdersNavigator = createNativeStackNavigator();

function OrdersNavigatorScreens() {
  return (
    <OrdersNavigator.Navigator>
      <OrdersNavigator.Screen
        name="OrdersScreen"
        component={OrdersScreen}
        options={({ navigation }) => ({
          title: "Your Orders",
          headerTintColor:
            Platform.OS === "android" ? "#ffffff" : colors.primary,
          headerStyle: {
            backgroundColor: Platform.OS === "android" ? colors.primary : "",
          },
          headerTitleStyle: {
            fontFamily: "open-sans-bold",
          },
          headerBackTitleStyle: {
            fontFamily: "open-sans-bold",
          },
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item
                title="Menu"
                iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
                onPress={() => navigation.toggleDrawer()}
              />
            </HeaderButtons>
          ),
        })}
      />
    </OrdersNavigator.Navigator>
  );
}

const AdminNavigator = createNativeStackNavigator<RootNavigatorParamList>();

function AdminNavigatorScreens() {
  return (
    <AdminNavigator.Navigator
      screenOptions={({ navigation }) => ({
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
      })}
    >
      <AdminNavigator.Screen
        name="UserProductsScreen"
        component={UserProductsScreen}
        options={({ navigation }) => ({
          title: "Your Products",
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item
                title="Menu"
                iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
                onPress={() => navigation.toggleDrawer()}
              />
            </HeaderButtons>
          ),
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item
                title="Add"
                iconName={
                  Platform.OS === "android" ? "md-create" : "ios-create"
                }
                onPress={() => navigation.navigate("EditProductScreen")}
              />
            </HeaderButtons>
          ),
        })}
      />
      <AdminNavigator.Screen
        name="EditProductScreen"
        component={EditProductScreen}
        options={({ route }) => ({
          title: route.params?.productId ? "Edit Product" : "Add Product",
        })}
      />
    </AdminNavigator.Navigator>
  );
}

const ShopNavigator = createDrawerNavigator();

export function AppRoutes() {
  return (
    <ShopNavigator.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: colors.primary,
      }}
    >
      <ShopNavigator.Screen
        name="Products"
        component={ProductsNavigatorScreens}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <ShopNavigator.Screen
        name="Orders"
        component={OrdersNavigatorScreens}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-list" : "ios-list"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <ShopNavigator.Screen
        name="Admin"
        component={AdminNavigatorScreens}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-create" : "ios-create"}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </ShopNavigator.Navigator>
  );
}
