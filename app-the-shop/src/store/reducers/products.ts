import { AnyAction } from "redux";

import { PRODUCTS } from "../../shared/data";

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((product) => product.ownerId === "u1"),
};

export function productsReducer(state = initialState, action: AnyAction) {
  return state;
}
