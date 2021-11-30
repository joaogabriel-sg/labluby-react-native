import { AnyAction } from "redux";

import { ADD_ORDER, SET_ORDERS } from "../actions";

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
        id: action.orderData.id,
        items: action.orderData.items,
        totalAmount: action.orderData.amount,
        date: action.orderData.date,
      };

      return { ...state, orders: state.orders.concat(newOrder) };
    case SET_ORDERS:
      return { ...state, orders: action.orders };
    default:
      return state;
  }
}
