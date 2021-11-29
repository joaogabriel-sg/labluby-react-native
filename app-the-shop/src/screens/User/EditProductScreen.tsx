import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TextInput,
  Platform,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

import { CustomHeaderButton } from "../../components";

import { EditProductScreenProps } from "../../routes";
import { createProduct, RootState, updateProduct } from "../../store";

export function EditProductScreen({
  navigation,
  route,
}: EditProductScreenProps) {
  const productId = route.params?.productId;
  const editedProduct = useSelector((state: RootState) =>
    state.products.userProducts.find((product) => product.id === productId)
  );

  const [title, setTitle] = useState(editedProduct ? editedProduct.title : "");
  const [imageUrl, setImageUrl] = useState(
    editedProduct ? editedProduct.imageUrl : ""
  );
  const [price, setPrice] = useState(
    editedProduct ? String(editedProduct.price) : ""
  );
  const [description, setDescription] = useState(
    editedProduct ? editedProduct.description : ""
  );

  const dispatch = useDispatch();

  const submitHandler = useCallback(() => {
    if (productId && editedProduct) {
      dispatch(updateProduct(productId, title, imageUrl, description));
    } else {
      dispatch(createProduct(title, description, imageUrl, +price));
    }

    navigation.goBack();
  }, [dispatch, productId, title, description, imageUrl, price]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Save"
            iconName={
              Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
            }
            onPress={submitHandler}
          />
        </HeaderButtons>
      ),
    });
  }, [submitHandler]);

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
          />
        </View>

        <View style={styles.formControl}>
          <Text style={styles.label}>image url</Text>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={setImageUrl}
          />
        </View>

        {!editedProduct && (
          <View style={styles.formControl}>
            <Text style={styles.label}>price</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={setPrice}
            />
          </View>
        )}

        <View style={styles.formControl}>
          <Text style={styles.label}>description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={setDescription}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  formControl: {
    width: "100%",
  },
  label: {
    marginVertical: 8,
    fontFamily: "open-sans-bold",
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#cccccc",
    borderBottomWidth: 1,
  },
});
