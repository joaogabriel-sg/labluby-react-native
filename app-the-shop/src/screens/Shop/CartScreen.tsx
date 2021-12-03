import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { Card, CartItem } from "../../components";

import { colors } from "../../shared/constants";
import { CartItem as ICartItem } from "../../shared/types";
import { removeFromCart, addOrder, RootState } from "../../store";

export function CartScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cartTotalAmount = useSelector(
    (state: RootState) => state.cart.totalAmount
  );

  const cartItems = useSelector((state: RootState) => {
    const transformedCartItems: ICartItem[] = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].productPrice,
        productPushToken: state.cart.items[key].productPushToken,
      });
    }
    return transformedCartItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    );
  });

  const dispatch = useDispatch();

  async function sendOrderHandler() {
    setIsLoading(true);
    setError(null);

    try {
      await dispatch(addOrder(cartItems, cartTotalAmount));
    } catch (err: any) {
      setError(err.message);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    if (error) Alert.alert("An error occurred!", error, [{ text: "Okay" }]);
  }, [error]);

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{" "}
          <Text style={styles.amount}>
            ${Math.round((cartTotalAmount * 100) / 100).toFixed(2)}
          </Text>
        </Text>
        {isLoading && <ActivityIndicator size="small" color={colors.primary} />}
        {!isLoading && (
          <Button
            title="Order Now"
            onPress={sendOrderHandler}
            disabled={cartItems.length === 0}
            color={colors.accent}
          />
        )}
      </Card>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.productId}
        renderItem={({ item }) => (
          <CartItem
            title={item.productTitle}
            quantity={item.quantity}
            amount={item.sum}
            deletable
            onRemove={() => {
              dispatch(removeFromCart(item.productId));
            }}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    padding: 10,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  summaryText: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
  amount: {
    color: colors.primary,
  },
});
