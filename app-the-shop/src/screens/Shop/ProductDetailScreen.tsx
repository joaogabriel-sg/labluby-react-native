import React from "react";
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { ProductDetailScreenProps } from "../../routes";
import { colors } from "../../shared/constants";
import { addToCart, RootState } from "../../store";

export function ProductDetailScreen({ route }: ProductDetailScreenProps) {
  const products = useSelector(
    (state: RootState) => state.products.availableProducts
  );

  const dispatch = useDispatch();

  const { productId } = route.params;
  const selectedProduct = products.find((product) => product.id === productId)!;

  return (
    <ScrollView>
      <Image source={{ uri: selectedProduct.imageUrl }} style={styles.image} />
      <View style={styles.actions}>
        <Button
          title="Add to Cart"
          onPress={() => dispatch(addToCart(selectedProduct))}
          color={colors.primary}
        />
      </View>
      <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
  actions: {
    marginVertical: 10,
    alignItems: "center",
  },
  price: {
    marginVertical: 20,
    fontFamily: "open-sans-bold",
    fontSize: 20,
    color: "#888888",
    textAlign: "center",
  },
  description: {
    marginHorizontal: 20,
    fontFamily: "open-sans",
    fontSize: 14,
    textAlign: "center",
  },
});
