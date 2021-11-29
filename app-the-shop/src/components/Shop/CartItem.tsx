import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  title: string;
  quantity: number;
  amount: number;
  deletable?: boolean;
  onRemove?: () => void;
}

export function CartItem({
  title,
  quantity,
  amount,
  deletable,
  onRemove,
}: Props) {
  return (
    <View style={styles.cartItem}>
      <View style={styles.itemData}>
        <Text style={styles.quantity}>{quantity} </Text>
        <Text style={styles.mainText}>{title}</Text>
      </View>

      <View style={styles.itemData}>
        <Text style={styles.mainText}>${amount.toFixed(2)}</Text>
        {deletable && (
          <TouchableOpacity onPress={onRemove} style={styles.deleteButton}>
            <Ionicons
              name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
              size={23}
              color="#aa0000"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cartItem: {
    backgroundColor: "#ffffff",
    padding: 10,
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemData: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantity: {
    fontFamily: "open-sans",
    fontSize: 16,
    color: "#888888",
  },
  mainText: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
  },
  deleteButton: {
    marginLeft: 20,
  },
});
