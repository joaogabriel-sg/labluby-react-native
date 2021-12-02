import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  StyleSheet,
  Text,
  View,
} from "react-native";
import * as Location from "expo-location";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { MapPreview } from "./MapPreview";

import { colors } from "../shared/constants";
import { RootStackParamList } from "../routes";

interface LocationPickerProps {
  navigation: NativeStackNavigationProp<RootStackParamList, "NewPlace">;
  mapPickedLocation: { lat: number; lng: number } | undefined;
  onLocationPicked: (location: { lat: number; lng: number }) => void;
}

interface IPickedLocation {
  lat: number;
  lng: number;
}

export function LocationPicker({
  navigation,
  mapPickedLocation,
  onLocationPicked,
}: LocationPickerProps) {
  const [isFetching, setIsFetching] = useState(false);
  const [pickedLocation, setPickedLocation] = useState<
    IPickedLocation | undefined
  >();

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
      const coordsData = {
        lat: coords.latitude,
        lng: coords.longitude,
      };
      setPickedLocation(coordsData);
      onLocationPicked(coordsData);
    } catch (err) {
      Alert.alert(
        "Could not fetch location!",
        "Please try again later or pick a location on the map.",
        [{ text: "Okay" }]
      );
    }
    setIsFetching(false);
  }

  function handlePickOnMap() {
    navigation.navigate("MapScreen");
  }

  useEffect(() => {
    if (mapPickedLocation) {
      setPickedLocation(mapPickedLocation);
      onLocationPicked({ ...mapPickedLocation });
    }
  }, [mapPickedLocation, onLocationPicked]);

  return (
    <View style={styles.locationPicker}>
      <MapPreview
        location={pickedLocation}
        onPress={handlePickOnMap}
        style={styles.mapPreview}
      >
        {!isFetching && <Text>No location chosen yet!</Text>}
        {isFetching && (
          <ActivityIndicator size="large" color={colors.primary} />
        )}
      </MapPreview>

      <View style={styles.actions}>
        <Button
          title="Get User Location"
          color={colors.primary}
          onPress={handleGetUserLocation}
        />
        <Button
          title="Pick on Map"
          color={colors.primary}
          onPress={handlePickOnMap}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 150,
    borderColor: "#cccccc",
    borderWidth: 1,
    marginBottom: 10,
  },
  locationPicker: {
    marginBottom: 15,
  },
  actions: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
