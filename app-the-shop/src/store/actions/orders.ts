import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";

import { CartItem, Order } from "../../shared/types";
import { RootState } from "../types";

export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDERS = "SET_ORDERS";

interface Items extends CartItem {
  productId: string;
}

export function fetchOrders(): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> {
  return async (dispatch, getState) => {
    const { userId } = getState().auth;

    try {
      const response = await fetch(
        `https://the-shop-app-87a3e-default-rtdb.firebaseio.com/orders/${userId}.json`
      );

      if (!response.ok) throw new Error("Something went wrong!");

      const responseData = await response.json();

      const loadedOrders: Order[] = [];
      for (const key in responseData) {
        loadedOrders.push({
          ...responseData[key],
          id: key,
          items: responseData[key].cartItems,
          date: new Date(responseData[key].date),
        });
      }

      dispatch({ type: SET_ORDERS, orders: loadedOrders });
    } catch (err) {
      throw err;
    }
  };
}

export function addOrder(
  cartItems: Items[],
  totalAmount: number
): ThunkAction<void, RootState, unknown, AnyAction> {
  return async (dispatch, getState) => {
    const { token, userId } = getState().auth;

    const date = new Date();

    const response = await fetch(
      `https://the-shop-app-87a3e-default-rtdb.firebaseio.com/orders/${userId}.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItems,
          totalAmount,
          date,
        }),
      }
    );

    if (!response.ok) throw new Error("Something went wrong!");

    const responseData = await response.json();

    dispatch({
      type: ADD_ORDER,
      orderData: {
        id: responseData.name,
        items: cartItems,
        amount: totalAmount,
        date,
      },
    });
  };
}
