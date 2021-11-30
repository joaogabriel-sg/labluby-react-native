import React from "react";
import { Button, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";

import { logout } from "../../store";

import { colors } from "../../shared/constants";

interface Props {
  onLogout: () => void;
}

export default function LogoutButton({ onLogout }: Props) {
  const dispatch = useDispatch();

  return (
    <Button
      title="Logout"
      color={colors.primary}
      onPress={() => {
        dispatch(logout());
        onLogout();
      }}
    />
  );
}

const styles = StyleSheet.create({});
