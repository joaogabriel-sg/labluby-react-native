import { AnyAction } from "redux";

import {
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  SET_PRODUCTS,
} from "../actions/products";

import { Product } from "../../shared/types";
import { ProductsState } from "../types";

const initialState: ProductsState = {
  availableProducts: [],
  userProducts: [],
};

export function productsReducer(
  state: ProductsState = initialState,
  action: AnyAction
): ProductsState {
  switch (action.type) {
    case CREATE_PRODUCT:
      const newProduct: Product = {
        ...action.productData,
      };

      return {
        ...state,
        userProducts: state.userProducts.concat(newProduct),
        availableProducts: state.availableProducts.concat(newProduct),
      };
    case UPDATE_PRODUCT:
      const productIndex = state.userProducts.findIndex(
        (product) => product.id === action.productId
      );

      const updatedProduct: Product = {
        id: action.productId,
        ownerId: state.userProducts[productIndex].ownerId,
        title: action.productData.title,
        price: state.userProducts[productIndex].price,
        imageUrl: action.productData.imageUrl,
        description: action.productData.description,
        pushToken: action.userProducts[productIndex].pushToken,
      };

      const updatedUserProducts = [...state.userProducts];
      updatedUserProducts[productIndex] = updatedProduct;

      const availableProductIndex = state.availableProducts.findIndex(
        (product) => product.id === action.productId
      );
      const updatedAvailableProducts = [...state.availableProducts];
      updatedAvailableProducts[availableProductIndex] = updatedProduct;

      return {
        ...state,
        userProducts: updatedUserProducts,
        availableProducts: updatedAvailableProducts,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        userProducts: state.userProducts.filter(
          (product) => product.id !== action.productId
        ),
        availableProducts: state.availableProducts.filter(
          (product) => product.id !== action.productId
        ),
      };
    case SET_PRODUCTS:
      return {
        ...state,
        availableProducts: action.products,
        userProducts: action.userProducts,
      };
    default:
      return state;
  }
}
