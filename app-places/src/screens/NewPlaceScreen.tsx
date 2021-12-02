import React, { useCallback, useState } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useDispatch } from "react-redux";

import { ImageSelector, LocationPicker } from "../components";

import { addPlace } from "../store";
import { NewPlaceScreenProps } from "../routes";

import { colors } from "../shared/constants";

interface ILocation {
  lat: number;
  lng: number;
}

export function NewPlaceScreen({ navigation, route }: NewPlaceScreenProps) {
  const [titleValue, setTitleValue] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<
    ILocation | undefined
  >();

  const dispatch = useDispatch();

  function handleChangeTitle(text: string) {
    setTitleValue(text);
  }

  function handleTakenImage(imagePath: string) {
    setSelectedImage(imagePath);
  }

  const handleLocationPicked = useCallback((location: ILocation) => {
    setSelectedLocation(location);
  }, []);

  function handleSavePlace() {
    if (titleValue.trim().length === 0) return;
    if (selectedImage.trim().length === 0) return;
    if (!selectedLocation) return;

    dispatch(addPlace(titleValue, selectedImage, selectedLocation));
    navigation.goBack();
  }

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.textInput}
          value={titleValue}
          onChangeText={handleChangeTitle}
        />
        <ImageSelector onImageTaken={handleTakenImage} />
        <LocationPicker
          navigation={navigation}
          mapPickedLocation={route.params?.pickedLocation}
          onLocationPicked={handleLocationPicked}
        />
        <Button
          title="Save Place"
          color={colors.primary}
          onPress={handleSavePlace}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: {
    marginBottom: 15,
    fontSize: 18,
  },
  textInput: {
    paddingVertical: 4,
    paddingHorizontal: 2,
    borderBottomColor: "#cccccc",
    borderBottomWidth: 1,
    marginBottom: 15,
  },
});
