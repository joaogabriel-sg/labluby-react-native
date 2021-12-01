import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { colors } from "../shared/constants";

interface PlaceItemProps {
  title: string;
  image: string;
  address: string;
  onSelect: () => void;
}

export function PlaceItem({ title, image, address, onSelect }: PlaceItemProps) {
  return (
    <TouchableOpacity onPress={onSelect} style={styles.placeItem}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.address}>{address}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  placeItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderBottomColor: "#cccccc",
    borderBottomWidth: 1,
  },
  image: {
    backgroundColor: "#0000bb",
    width: 70,
    height: 70,
    borderRadius: 35,
    borderColor: colors.primary,
    borderWidth: 1,
  },
  infoContainer: {
    width: 250,
    marginLeft: 25,
    justifyContent: "center",
  },
  title: {
    marginBottom: 5,
    fontSize: 18,
    color: "#000000",
  },
  address: {
    fontSize: 16,
    color: "#666666",
  },
});
