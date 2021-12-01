import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

import { PlaceDetailScreenProps } from "../routes";

export function PlaceDetailScreen({
  navigation,
  route,
}: PlaceDetailScreenProps) {
  const { placeId, placeTitle } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: placeTitle });
  }, []);

  return (
    <View>
      <Text>PlaceDetailScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
