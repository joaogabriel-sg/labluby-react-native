import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

import { AppRoutes } from "./src/routes";

import { productsReducer } from "./src/store";

const rootReducer = combineReducers({
  products: productsReducer,
});

const store = createStore(rootReducer);

function fetchFonts() {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
}

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (!fontsLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontsLoaded(true)}
        onError={() => {}}
      />
    );
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    </Provider>
  );
}
