import { Product } from "../../shared/types";

export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";

export function addToCart(product: Product) {
  return { type: ADD_TO_CART, product };
}

export function removeFromCart(productId: string) {
  return { type: REMOVE_FROM_CART, productId };
}
