import { AnyAction } from "redux";

import { AUTHENTICATE, LOGOUT } from "../actions";

import { AuthState } from "../types";

const initialState: AuthState = {
  token: null,
  userId: null,
};

export function authReducer(
  state: AuthState = initialState,
  action: AnyAction
): AuthState {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        ...state,
        token: action.token,
        userId: action.userId,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}
