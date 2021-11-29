import React from "react";
import { StyleSheet, FlatList, Button, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { ProductItem } from "../../components";

import { deleteProduct, RootState } from "../../store";
import { UserProductsScreenProps } from "../../routes";

import { colors } from "../../shared/constants";

export function UserProductsScreen({ navigation }: UserProductsScreenProps) {
  const userProducts = useSelector(
    (state: RootState) => state.products.userProducts
  );

  const dispatch = useDispatch();

  function deleteHandler(id: string) {
    Alert.alert("Are you sure?", "Do you really want to delete this item?", [
      { text: "No", style: "default" },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          dispatch(deleteProduct(id));
        },
      },
    ]);
  }

  function editProductHandler(id: string) {
    navigation.navigate("EditProductScreen", { productId: id });
  }

  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ProductItem
          title={item.title}
          image={item.imageUrl}
          price={item.price}
          onSelect={() => {
            editProductHandler(item.id);
          }}
        >
          <Button
            title="Edit"
            onPress={() => {
              editProductHandler(item.id);
            }}
            color={colors.primary}
          />
          <Button
            title="Delete"
            onPress={deleteHandler.bind(null, item.id)}
            color={colors.primary}
          />
        </ProductItem>
      )}
    />
  );
}

const styles = StyleSheet.create({});
