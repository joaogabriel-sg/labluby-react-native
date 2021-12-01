import React, { useEffect } from "react";
import { FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { PlaceItem } from "../components";

import { PlacesListScreenProps } from "../routes";
import { loadPlaces, RootState } from "../store";

export function PlacesListScreen({ navigation }: PlacesListScreenProps) {
  const { places } = useSelector((state: RootState) => state.places);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadPlaces());
  }, [dispatch]);

  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <PlaceItem
          title={item.title}
          address=""
          image={item.imageUri}
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
