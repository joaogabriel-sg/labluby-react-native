import { CartItem } from "../../shared/types";

export const ADD_ORDER = "ADD_ORDER";

interface Items extends CartItem {
  productId: string;
}

export function addOrder(cartItems: Items[], totalAmount: number) {
  return {
    type: ADD_ORDER,
    orderData: { items: cartItems, amount: totalAmount },
  };
}
