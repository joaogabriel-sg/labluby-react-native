import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  StyleSheet,
  Text,
  View,
} from "react-native";
import * as Location from "expo-location";

import { colors } from "../shared/constants";

interface LocationPickerProps {}

interface IPickedLocation {
  lat: number;
  lng: number;
}

export function LocationPicker() {
  const [isFetching, setIsFetching] = useState(false);
  const [pickedLocation, setPickedLocation] = useState<IPickedLocation | null>(
    null
  );

  async function handleGetUserLocation() {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant location permissions to use this app.",
        [{ text: "Okay" }]
      );
      return;
    }

    setIsFetching(true);
    try {
      const { coords } = await Location.getCurrentPositionAsync();
      setPickedLocation({
        lat: coords.latitude,
        lng: coords.longitude,
      });
    } catch (err) {
      Alert.alert(
        "Could not fetch location!",
        "Please try again later or pick a location on the map.",
        [{ text: "Okay" }]
      );
    }
    setIsFetching(false);
  }

  return (
    <View style={styles.locationPicker}>
      <View style={styles.mapPreview}>
        {!isFetching && <Text>No location chosen yet!</Text>}
        {isFetching && (
          <ActivityIndicator size="large" color={colors.primary} />
        )}
      </View>
      <Button
        title="Get User Location"
        color={colors.primary}
        onPress={handleGetUserLocation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15,
  },
  mapPreview: {
    width: "100%",
    height: 150,
    borderColor: "#cccccc",
    borderWidth: 1,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
