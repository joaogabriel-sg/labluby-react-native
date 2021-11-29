import React from "react";
import { StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";

import { OrderItem } from "../../components";

import { RootState } from "../../store";

export function OrdersScreen() {
  const orders = useSelector((state: RootState) => state.orders.orders);

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

const styles = StyleSheet.create({});
