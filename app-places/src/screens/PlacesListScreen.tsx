import React from "react";
import { FlatList } from "react-native";
import { useSelector } from "react-redux";

import { PlaceItem } from "../components";

import { PlacesListScreenProps } from "../routes";
import { RootState } from "../store";

export function PlacesListScreen({ navigation }: PlacesListScreenProps) {
  const { places } = useSelector((state: RootState) => state.places);

  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <PlaceItem
          title={item.title}
          address=""
          image=""
          onSelect={() => {
            navigation.navigate("PlaceDetail", {
              placeId: item.id,
              placeTitle: item.title,
            });
          }}
        />
      )}
    />
  );
}
