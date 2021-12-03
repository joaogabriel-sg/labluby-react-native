import { AnyAction } from "redux";

import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  ADD_ORDER,
  DELETE_PRODUCT,
} from "../actions";

import { CartItem, Product } from "../../shared/types";
import { CartState } from "../types";

const initialState: CartState = {
  items: {},
  totalAmount: 0,
};

export function cartReducer(
  state: CartState = initialState,
  action: AnyAction
): CartState {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct: Product = action.product;
      const productTitle = addedProduct.title;
      const productPrice = addedProduct.price;
      const productPushToken = addedProduct.pushToken;

      let updatedOrNewCartItem: CartItem;

      if (state.items[addedProduct.id])
        updatedOrNewCartItem = {
          productId: addedProduct.id,
          productTitle,
          productPrice,
          quantity: state.items[addedProduct.id].quantity + 1,
          sum: state.items[addedProduct.id].sum + productPrice,
          productPushToken,
        };
      else
        updatedOrNewCartItem = {
          productId: addedProduct.id,
          productTitle,
          productPrice,
          quantity: 1,
          sum: productPrice,
          productPushToken,
        };

      return {
        ...state,
        items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
        totalAmount: state.totalAmount + productPrice,
      };
    case REMOVE_FROM_CART:
      const selectedCartItem = state.items[action.productId];
      const currentQuantity = selectedCartItem.quantity;

      let updatedCartItems;

      if (currentQuantity > 1) {
        const updatedCartItem: CartItem = {
          ...selectedCartItem,
          quantity: selectedCartItem.quantity - 1,
          sum: selectedCartItem.sum - selectedCartItem.productPrice,
        };

        updatedCartItems = {
          ...state.items,
          [action.productId]: updatedCartItem,
        };
      } else {
        updatedCartItems = { ...state.items };
        delete updatedCartItems[action.productId];
      }

      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedCartItem.productPrice,
      };
    case ADD_ORDER:
      return initialState;
    case DELETE_PRODUCT:
      if (!state.items[action.productId]) return state;

      const updatedItems = { ...state.items };
      const itemTotal = state.items[action.productId].sum;
      delete updatedItems[action.productId];

      return {
        ...state,
        items: updatedItems,
        totalAmount: state.totalAmount - itemTotal,
      };
    default:
      return state;
  }
}
