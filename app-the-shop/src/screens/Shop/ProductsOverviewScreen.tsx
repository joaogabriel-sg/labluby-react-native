import React from "react";
import { StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { ProductItem } from "../../components";

import { ProductsOverviewScreenProps } from "../../routes";
import { RootState } from "../../store";

export function ProductsOverviewScreen({
  navigation,
}: ProductsOverviewScreenProps) {
  const products = useSelector(
    (state: RootState) => state.products.availableProducts
  );

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
          onAddToCart={() => {}}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({});
