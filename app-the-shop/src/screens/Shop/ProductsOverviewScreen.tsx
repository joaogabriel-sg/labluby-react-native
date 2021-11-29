import React from "react";
import { StyleSheet, FlatList, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { ProductItem } from "../../components";

import { ProductsOverviewScreenProps } from "../../routes";
import { colors } from "../../shared/constants";

import { addToCart, RootState } from "../../store";

export function ProductsOverviewScreen({
  navigation,
}: ProductsOverviewScreenProps) {
  const products = useSelector(
    (state: RootState) => state.products.availableProducts
  );

  const dispatch = useDispatch();

  function selectItemHandler(id: string, title: string) {
    navigation.navigate("ProductDetailScreen", {
      productId: id,
      productTitle: title,
    });
  }

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ProductItem
          title={item.title}
          price={item.price}
          image={item.imageUrl}
          onSelect={() => {
            selectItemHandler(item.id, item.title);
          }}
        >
          <Button
            title="View Details"
            onPress={() => {
              selectItemHandler(item.id, item.title);
            }}
            color={colors.primary}
          />
          <Button
            title="To Cart"
            onPress={() => dispatch(addToCart(item))}
            color={colors.primary}
          />
        </ProductItem>
      )}
    />
  );
}

const styles = StyleSheet.create({});
