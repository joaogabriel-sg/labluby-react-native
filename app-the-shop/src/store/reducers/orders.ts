import { AnyAction } from "redux";

import { ADD_ORDER } from "../actions";

import { OrdersState } from "../types";
import { Order } from "../../shared/types";

const initialState: OrdersState = {
  orders: [],
};

export function ordersReducers(
  state: OrdersState = initialState,
  action: AnyAction
): OrdersState {
  switch (action.type) {
    case ADD_ORDER:
      const newOrder: Order = {
        id: new Date().toString(),
        items: action.orderData.items,
        totalAmount: action.orderData.amount,
        date: new Date(),
      };

      return { ...state, orders: state.orders.concat(newOrder) };
  }

  return state;
}
