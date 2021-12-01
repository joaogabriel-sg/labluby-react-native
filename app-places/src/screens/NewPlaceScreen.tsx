import React, { useState } from "react";
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

export function NewPlaceScreen({ navigation }: NewPlaceScreenProps) {
  const [titleValue, setTitleValue] = useState("");
  const [selectedImage, setSelectedImage] = useState("");

  const dispatch = useDispatch();

  function handleChangeTitle(text: string) {
    setTitleValue(text);
  }

  function handleTakenImage(imagePath: string) {
    setSelectedImage(imagePath);
  }

  function handleSavePlace() {
    dispatch(addPlace(titleValue, selectedImage));
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
        <LocationPicker />
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
