import React, { ReactNode } from "react";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

const { GOOGLE_MAPS_API_KEY } = process.env;

interface MapPreviewProps extends TouchableOpacityProps {
  location?: {
    lat: number;
    lng: number;
  };
  children?: ReactNode;
}

export function MapPreview({
  location,
  style,
  children,
  ...rest
}: MapPreviewProps) {
  let imagePreviewUrl = "";

  const mapPreviewStyles = Object.assign({}, styles.mapPreview, style);

  if (!!location) {
    imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${location.lat},${location.lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${location.lat},${location.lng}&key=${GOOGLE_MAPS_API_KEY}`;
  }

  return (
    <TouchableOpacity style={mapPreviewStyles} {...rest}>
      {!!location ? (
        <Image source={{ uri: imagePreviewUrl }} style={styles.mapImage} />
      ) : (
        children
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  mapPreview: {
    alignItems: "center",
    justifyContent: "center",
  },
  mapImage: {
    width: "100%",
    height: "100%",
  },
});
