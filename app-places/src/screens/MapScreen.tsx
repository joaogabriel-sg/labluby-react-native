import React, { useCallback, useEffect, useState } from "react";
import { Platform, StyleSheet, Text, TouchableOpacity } from "react-native";
import MapView, { MapEvent, Marker } from "react-native-maps";

import { MapScreenProps } from "../routes";

import { colors } from "../shared/constants";

interface ISelectedLocation {
  lat: number;
  lng: number;
}

export function MapScreen({ navigation, route }: MapScreenProps) {
  const initialLocation = route.params?.initialLocation;
  const readonly = route.params?.readonly;

  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  const mapRegion = {
    latitude: initialLocation ? initialLocation.lat : 37.78,
    longitude: initialLocation ? initialLocation.lng : -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  function handleSelectLocation(event: MapEvent<{}>) {
    if (readonly) return;

    const coordinate = event.nativeEvent.coordinate;
    setSelectedLocation({
      lat: coordinate.latitude,
      lng: coordinate.longitude,
    });
  }

  const handlerSavePickedLocation = useCallback(() => {
    if (readonly) return;
    if (!selectedLocation) return;

    navigation.navigate("NewPlace", { pickedLocation: selectedLocation });
  }, [selectedLocation]);

  useEffect(() => {
    if (readonly) return;

    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={handlerSavePickedLocation}
          style={styles.headerButton}
        >
          <Text style={styles.headerButtonText}>Save</Text>
        </TouchableOpacity>
      ),
    });
  }, [readonly, handlerSavePickedLocation]);

  return (
    <MapView
      region={mapRegion}
      onPress={handleSelectLocation}
      style={styles.map}
    >
      {!!selectedLocation && (
        <Marker
          title="Picked Location"
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
          }}
        />
      )}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  headerButton: {
    marginHorizontal: 20,
  },
  headerButtonText: {
    fontSize: 16,
    color: Platform.OS === "android" ? "#ffffff" : colors.primary,
  },
});
