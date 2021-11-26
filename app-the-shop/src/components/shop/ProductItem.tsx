import React from "react";
import {
  Button,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { colors } from "../../shared/constants";

interface Props {
  title: string;
  price: number;
  image: string;
  onViewDetail: () => void;
  onAddToCart: () => void;
}

function ProductItemContent({
  title,
  price,
  image,
  onViewDetail,
  onAddToCart,
}: Props) {
  return (
    <>
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.image} />
      </View>

      <View style={styles.details}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.price}>${price.toFixed(2)}</Text>
      </View>

      <View style={styles.actions}>
        <Button
          title="View Details"
          onPress={onViewDetail}
          color={colors.primary}
        />
        <Button title="To Cart" onPress={onAddToCart} color={colors.primary} />
      </View>
    </>
  );
}

export function ProductItem({
  title,
  price,
  image,
  onViewDetail,
  onAddToCart,
}: Props) {
  const productItemContent = (
    <ProductItemContent
      title={title}
      image={image}
      price={price}
      onViewDetail={onViewDetail}
      onAddToCart={onAddToCart}
    />
  );

  if (Platform.OS === "android" && Platform.Version >= 21)
    return (
      <View style={styles.product}>
        <View style={styles.touchable}>
          <TouchableWithoutFeedback onPress={onViewDetail}>
            {productItemContent}
          </TouchableWithoutFeedback>
        </View>
      </View>
    );

  return (
    <View style={styles.product}>
      <View style={styles.touchable}>
        <TouchableOpacity onPress={onViewDetail}>
          {productItemContent}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  product: {
    backgroundColor: "#ffffff",
    height: 300,
    borderRadius: 10,
    margin: 20,
    shadowColor: "#000000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  touchable: {
    borderRadius: 10,
    overflow: "hidden",
  },
  imageContainer: {
    width: "100%",
    height: "60%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  details: {
    padding: 10,
    height: "15%",
    alignItems: "center",
  },
  title: {
    marginVertical: 2,
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
  price: {
    fontFamily: "open-sans",
    fontSize: 14,
    color: "#888888",
  },
  actions: {
    height: "25%",
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
