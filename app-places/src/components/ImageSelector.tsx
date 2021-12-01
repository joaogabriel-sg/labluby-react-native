import React, { useState } from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import * as ImagePicker from "expo-image-picker";

import { colors } from "../shared/constants";

interface ImageSelectorProps {
  onImageTaken: (imagePath: string) => void;
}

export function ImageSelector({ onImageTaken }: ImageSelectorProps) {
  const [previewImage, setPreviewImage] = useState("");

  async function handleTakeImage() {
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    if (image.cancelled) return;

    setPreviewImage(image.uri);
    onImageTaken(image.uri);
  }

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {!previewImage && <Text>No image picked yet</Text>}
        {!!previewImage && (
          <Image source={{ uri: previewImage }} style={styles.image} />
        )}
      </View>
      <Button
        title="Take Image"
        color={colors.primary}
        onPress={handleTakeImage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  imagePicker: {
    marginBottom: 15,
    alignItems: "center",
  },
  imagePreview: {
    width: "100%",
    height: 200,
    borderColor: "#cccccc",
    borderWidth: 1,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
