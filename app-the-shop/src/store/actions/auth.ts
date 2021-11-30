import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { RootState } from "../types";

export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";
export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";

let timer: NodeJS.Timeout;

export function authenticate(
  userId: string,
  token: string,
  expiryTime: number
): ThunkAction<void, RootState, unknown, AnyAction> {
  return (dispatch) => {
    dispatch(setLogoutTimer(expiryTime));
    dispatch({ type: AUTHENTICATE, userId, token });
  };
}

export function signup(
  email: string,
  password: string
): ThunkAction<void, RootState, unknown, AnyAction> {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBAG_NsSNKj6t0ZI2wmiHFyC6H3zi_w1Dk",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, returnSecureToken: true }),
      }
    );

    if (!response.ok) {
      const errorResponseData = await response.json();
      const errorId = errorResponseData.error.message;

      let message = "Something went wrong!";
      if (errorId === "EMAIL_EXISTS") message = "This e-mail exists already!";

      throw new Error(message);
    }

    const responseData = await response.json();

    dispatch(
      authenticate(
        responseData.localId,
        responseData.idToken,
        parseInt(responseData.expiresIn) * 1000
      )
    );

    const expirationDate = new Date(
      new Date().getTime() + parseInt(responseData.expiresIn) * 1000
    );

    saveDataToStorage(
      responseData.idToken,
      responseData.localId,
      expirationDate
    );
  };
}

export function login(
  email: string,
  password: string
): ThunkAction<void, RootState, unknown, AnyAction> {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBAG_NsSNKj6t0ZI2wmiHFyC6H3zi_w1Dk",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, returnSecureToken: true }),
      }
    );

    if (!response.ok) {
      const errorResponseData = await response.json();
      const errorId = errorResponseData.error.message;

      let message = "Something went wrong!";
      if (errorId === "EMAIL_NOT_FOUND")
        message = "This e-mail could not be found!";
      else if (errorId === "INVALID_PASSWORD")
        message = "This password is not valid!";

      throw new Error(message);
    }

    const responseData = await response.json();

    dispatch(
      authenticate(
        responseData.localId,
        responseData.idToken,
        parseInt(responseData.expiresIn) * 1000
      )
    );

    const expirationDate = new Date(
      new Date().getTime() + parseInt(responseData.expiresIn) * 1000
    );

    saveDataToStorage(
      responseData.idToken,
      responseData.localId,
      expirationDate
    );
  };
}

export function logout() {
  clearLogoutTimer();
  AsyncStorage.removeItem("@theShopApp");
  return { type: LOGOUT };
}

function clearLogoutTimer() {
  if (timer) clearTimeout(timer);
}

function setLogoutTimer(
  expirationTime: number
): ThunkAction<void, RootState, unknown, AnyAction> {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
}

function saveDataToStorage(
  token: string,
  userId: string,
  expirationDate: Date
) {
  AsyncStorage.setItem(
    "@theShopApp",
    JSON.stringify({ token, userId, expiryDate: expirationDate.toISOString() })
  );
}
