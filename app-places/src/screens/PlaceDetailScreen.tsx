import React, { useEffect } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

import { MapPreview } from "../components";

import { RootState } from "../store";
import { PlaceDetailScreenProps } from "../routes";

import { colors } from "../shared/constants";

export function PlaceDetailScreen({
  navigation,
  route,
}: PlaceDetailScreenProps) {
  const { placeId, placeTitle } = route.params;

  const selectedPlace = useSelector((state: RootState) =>
    state.places.places.find((place) => place.id === placeId)
  )!;

  const selectedLocation = { lat: selectedPlace.lat, lng: selectedPlace.lng };

  function handleShopMap() {
    navigation.navigate("MapScreen", {
      readonly: true,
      initialLocation: selectedLocation,
    });
  }

  useEffect(() => {
    navigation.setOptions({ title: placeTitle });
  }, []);

  return (
    <ScrollView contentContainerStyle={{ alignItems: "center" }}>
      <Image source={{ uri: selectedPlace.imageUri }} style={styles.image} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{selectedPlace.address}</Text>
        </View>
        <MapPreview
          location={selectedLocation}
          onPress={handleShopMap}
          style={styles.mapPreview}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
    backgroundColor: "#ccc",
  },
  locationContainer: {
    marginVertical: 20,
    width: "90%",
    maxWidth: 350,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 10,
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: colors.primary,
    textAlign: "center",
  },
  mapPreview: {
    width: "100%",
    maxWidth: 350,
    height: 300,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});
