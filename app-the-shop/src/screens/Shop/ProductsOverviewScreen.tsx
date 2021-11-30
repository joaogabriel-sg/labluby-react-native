import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  FlatList,
  Button,
  ActivityIndicator,
  View,
  Text,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";

import { ProductItem } from "../../components";

import { ProductsOverviewScreenProps } from "../../routes";
import { colors } from "../../shared/constants";

import { addToCart, fetchProducts, RootState } from "../../store";

export function ProductsOverviewScreen({
  navigation,
}: ProductsOverviewScreenProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

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

  const loadProducts = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(fetchProducts());
    } catch (err: any) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch]);

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      loadProducts().then(() => {
        setIsLoading(false);
      });
    }, [loadProducts])
  );

  if (error)
    return (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
        <Button
          title="Try again"
          onPress={loadProducts}
          color={colors.primary}
        />
      </View>
    );

  if (isLoading)
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );

  if (products.length === 0)
    return (
      <View style={styles.centered}>
        <Text>No products found. Maybe start adding some!</Text>
      </View>
    );

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      refreshing={isRefreshing}
      onRefresh={loadProducts}
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

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
