import { AnyAction } from "redux";

import { ADD_TO_CART, REMOVE_FROM_CART, ADD_ORDER } from "../actions";

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

      let updatedOrNewCartItem: CartItem;

      if (state.items[addedProduct.id])
        updatedOrNewCartItem = {
          productTitle,
          productPrice,
          quantity: state.items[addedProduct.id].quantity + 1,
          sum: state.items[addedProduct.id].sum + productPrice,
        };
      else
        updatedOrNewCartItem = {
          productTitle,
          productPrice,
          quantity: 1,
          sum: productPrice,
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
    default:
      return state;
  }
}
