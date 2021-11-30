import React, { useEffect } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";

import { authenticate } from "../store";
import { StartupScreenProps } from "../routes";

import { colors } from "../shared/constants";

export function StartupScreen({ navigation }: StartupScreenProps) {
  const dispatch = useDispatch();

  useEffect(() => {
    async function tryLogin() {
      const userData = await AsyncStorage.getItem("@theShopApp");

      if (!userData) {
        navigation.navigate("Auth");
        return;
      }

      const { token, userId, expiryDate } = JSON.parse(userData);
      const expirationDate = new Date(expiryDate);

      if (expirationDate <= new Date() || !token || !userId) {
        navigation.navigate("Auth");
        return;
      }

      const expirationTime = expirationDate.getTime() - new Date().getTime();

      navigation.navigate("Shop", { screen: "ProductsOverview" });
      dispatch(authenticate(userId, token, expirationTime));
    }

    tryLogin();
  }, []);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
