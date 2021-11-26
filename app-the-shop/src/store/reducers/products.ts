import { AnyAction } from "redux";

import { PRODUCTS } from "../../shared/data";
import { ProductsState } from "../types";

const initialState: ProductsState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((product) => product.ownerId === "u1"),
};

export function productsReducer(
  state: ProductsState = initialState,
  action: AnyAction
) {
  return state;
}
