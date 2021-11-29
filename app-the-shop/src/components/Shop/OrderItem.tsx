import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import moment from "moment";

import { CartItem } from "./CartItem";

import { colors } from "../../shared/constants";
import { CartItem as CartItemType } from "../../shared/types";

interface Props {
  items: CartItemType[];
  amount: number;
  date: Date;
}

export function OrderItem({ items, amount, date }: Props) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <View style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>${amount.toFixed(2)}</Text>
        <Text style={styles.date}>
          {moment(date).format("MMMM Do YYYY, hh:mm")}
        </Text>
      </View>

      <Button
        title={showDetails ? "Hide Details" : "Show Details"}
        onPress={() => {
          setShowDetails((prevShowDetails) => !prevShowDetails);
        }}
        color={colors.primary}
      />

      {showDetails && (
        <View style={styles.detailItems}>
          {items.map((cartItem) => (
            <CartItem
              key={cartItem.productId}
              title={cartItem.productTitle}
              quantity={cartItem.quantity}
              amount={cartItem.sum}
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  orderItem: {
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 10,
    margin: 20,
    shadowColor: "#000000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    alignItems: "center",
  },
  summary: {
    width: "100%",
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  totalAmount: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
  },
  date: {
    fontFamily: "open-sans",
    fontSize: 16,
    color: "#888888",
  },
  detailItems: {
    width: "100%",
  },
});
