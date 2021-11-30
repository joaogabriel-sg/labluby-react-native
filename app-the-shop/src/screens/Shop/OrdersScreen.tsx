import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, FlatList, View, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";

import { OrderItem } from "../../components";

import { fetchOrders, RootState } from "../../store";

import { colors } from "../../shared/constants";

export function OrdersScreen() {
  const [isLoading, setIsLoading] = useState(true);

  const orders = useSelector((state: RootState) => state.orders.orders);
  const dispatch = useDispatch();

  const loadOrders = useCallback(async () => {
    setIsLoading(true);
    await dispatch(fetchOrders());
    setIsLoading(false);
  }, [dispatch]);

  useFocusEffect(
    useCallback(() => {
      loadOrders();
    }, [dispatch, loadOrders])
  );

  if (isLoading)
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <OrderItem
          items={item.items}
          amount={item.totalAmount}
          date={item.date}
        />
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
