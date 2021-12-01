import React from "react";
import { Platform } from "react-native";
import {
  HeaderButton,
  HeaderButtonProps,
} from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "../shared/constants";

export function CustomHeaderButton(props: HeaderButtonProps) {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
      color={Platform.OS === "android" ? "#ffffff" : colors.primary}
    />
  );
}
