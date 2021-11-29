import React, { ReactNode } from "react";
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

import { Card } from "../UI";

interface Props {
  title: string;
  price: number;
  image: string;
  children: ReactNode | ReactNode[];
  onSelect: () => void;
}

function ProductItemContent({
  title,
  price,
  image,
  children,
}: Omit<Props, "onSelect">) {
  return (
    <>
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.image} />
      </View>

      <View style={styles.details}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.price}>${price.toFixed(2)}</Text>
      </View>

      <View style={styles.actions}>{children}</View>
    </>
  );
}

export function ProductItem({
  title,
  price,
  image,
  children,
  onSelect,
}: Props) {
  const productItemContent = (
    <ProductItemContent title={title} image={image} price={price}>
      {children}
    </ProductItemContent>
  );

  if (Platform.OS === "android" && Platform.Version >= 21)
    return (
      <Card style={styles.product}>
        <View style={styles.touchable}>
          <TouchableWithoutFeedback onPress={onSelect}>
            {productItemContent}
          </TouchableWithoutFeedback>
        </View>
      </Card>
    );

  return (
    <Card style={styles.product}>
      <View style={styles.touchable}>
        <TouchableOpacity onPress={onSelect}>
          {productItemContent}
        </TouchableOpacity>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  product: {
    height: 300,
    margin: 20,
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
    height: "17%",
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
    height: "23%",
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
