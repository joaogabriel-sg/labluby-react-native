import React from "react";
import { StyleSheet, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { ProductItem } from "../../components";

import { ProductsOverviewScreenProps } from "../../routes";
import { addToCart, RootState } from "../../store";

export function ProductsOverviewScreen({
  navigation,
}: ProductsOverviewScreenProps) {
  const products = useSelector(
    (state: RootState) => state.products.availableProducts
  );

  const dispatch = useDispatch();

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ProductItem
          title={item.title}
          price={item.price}
          image={item.imageUrl}
          onViewDetail={() => {
            navigation.navigate("ProductDetailScreen", {
              productId: item.id,
              productTitle: item.title,
            });
          }}
          onAddToCart={() => dispatch(addToCart(item))}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({});
