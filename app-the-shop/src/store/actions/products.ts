import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";

import { Product } from "../../shared/types";
import { RootState } from "../types";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export function fetchProducts(): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> {
  return async (dispatch, getState) => {
    const { userId } = getState().auth;

    try {
      const response = await fetch(
        "https://the-shop-app-87a3e-default-rtdb.firebaseio.com/products.json"
      );

      if (!response.ok) throw new Error("Something went wrong!");

      const responseData = await response.json();

      const loadedProducts: Product[] = [];
      for (const key in responseData) {
        loadedProducts.push({ ...responseData[key], id: key });
      }

      dispatch({
        type: SET_PRODUCTS,
        products: loadedProducts,
        userProducts: loadedProducts.filter(
          (product) => product.ownerId === userId
        ),
      });
    } catch (err) {
      throw err;
    }
  };
}

export function deleteProduct(
  productId: string
): ThunkAction<void, RootState, unknown, AnyAction> {
  return async (dispatch, getState) => {
    const token = getState().auth.token;

    const response = await fetch(
      `https://the-shop-app-87a3e-default-rtdb.firebaseio.com/products/${productId}.json?auth=${token}`,
      { method: "DELETE" }
    );

    if (!response.ok) throw new Error("Something went wrong!");

    dispatch({ type: DELETE_PRODUCT, productId });
  };
}

export function createProduct(
  title: string,
  description: string,
  imageUrl: string,
  price: number
): ThunkAction<void, RootState, unknown, AnyAction> {
  return async (dispatch, getState) => {
    const { token, userId } = getState().auth;

    const response = await fetch(
      `https://the-shop-app-87a3e-default-rtdb.firebaseio.com/products.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          price,
          ownerId: userId,
        }),
      }
    );

    const responseData = await response.json();

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: responseData.name,
        title,
        description,
        imageUrl,
        price,
        ownerId: userId,
      },
    });
  };
}

export function updateProduct(
  id: string,
  title: string,
  imageUrl: string,
  description: string
): ThunkAction<void, RootState, unknown, AnyAction> {
  return async (dispatch, getState) => {
    const token = getState().auth.token;

    const response = await fetch(
      `https://the-shop-app-87a3e-default-rtdb.firebaseio.com/products/${id}.json?auth=${token}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
        }),
      }
    );

    if (!response.ok) throw new Error("Something went wrong!");

    dispatch({
      type: UPDATE_PRODUCT,
      productId: id,
      productData: {
        title,
        imageUrl,
        description,
      },
    });
  };
}
