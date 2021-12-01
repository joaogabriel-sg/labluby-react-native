import React from "react";
import { StatusBar } from "react-native";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import { NavigationContainer } from "@react-navigation/native";

import { AppRoutes } from "./src/routes";

import { colors } from "./src/shared/constants";
import { init } from "./src/shared/helpers";

import { placesReducer } from "./src/store";

init()
  .then(() => {
    console.log("Initialized database.");
  })
  .catch((err) => {
    console.log("Initializing db failed.");
    console.log(err);
  });

const rootReducer = combineReducers({
  places: placesReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
        <AppRoutes />
      </NavigationContainer>
    </Provider>
  );
}
