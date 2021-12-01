import React from "react";
import { Platform } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { CustomHeaderButton } from "../components";

import {
  MapScreen,
  NewPlaceScreen,
  PlaceDetailScreen,
  PlacesListScreen,
} from "../screens";

import { RootStackParamList } from "./types";

import { colors } from "../shared/constants";

const PlacesNavigator = createNativeStackNavigator<RootStackParamList>();

export function AppRoutes() {
  return (
    <PlacesNavigator.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Platform.OS === "android" ? colors.primary : "",
        },
        headerTintColor: Platform.OS === "android" ? "#ffffff" : colors.primary,
      }}
    >
      <PlacesNavigator.Screen
        name="Places"
        component={PlacesListScreen}
        options={({ navigation }) => ({
          title: "All Places",
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item
                title="Add Place"
                iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
                onPress={() => {
                  navigation.navigate("NewPlace");
                }}
              />
            </HeaderButtons>
          ),
        })}
      />
      <PlacesNavigator.Screen
        name="PlaceDetail"
        component={PlaceDetailScreen}
        options={{ title: "Place Detail" }}
      />
      <PlacesNavigator.Screen
        name="NewPlace"
        component={NewPlaceScreen}
        options={{ title: "Add Place" }}
      />
      <PlacesNavigator.Screen
        name="MapScreen"
        component={MapScreen}
        options={{ title: "Map" }}
      />
    </PlacesNavigator.Navigator>
  );
}
