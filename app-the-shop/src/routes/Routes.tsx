import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootState } from "../store";

import { AppRoutes } from "./App.routes";
import { RootNavigatorParamList } from "./types";

type NavigationProp = NativeStackNavigationProp<RootNavigatorParamList>;

export function Routes() {
  const isAuth = useSelector((state: RootState) => !!state.auth.token);
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    if (!isAuth) navigation.navigate("Auth");
  }, [isAuth]);

  return <AppRoutes />;
}

const styles = StyleSheet.create({});
