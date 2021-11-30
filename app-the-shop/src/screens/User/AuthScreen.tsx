import React, { useState, useCallback, useReducer, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Button,
  ActivityIndicator,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";

import { Input, Card } from "../../components";

import { login, signup } from "../../store";
import { AuthScreenProps } from "../../routes";

import { colors } from "../../shared/constants";

enum ActionKind {
  FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE",
}

interface Action {
  type: ActionKind;
  payload: any;
}

interface State {
  inputValues: {
    email: string;
    password: string;
  };
  inputValidities: {
    email: boolean;
    password: boolean;
  };
  isFormValid: boolean;
}

type FormKey = keyof { email: string; password: string };

const formKeys: FormKey[] = ["email", "password"];

function formReducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionKind.FORM_INPUT_UPDATE:
      const updatedValue = {
        ...state.inputValues,
        [action.payload.input]: action.payload.value,
      };

      const updatedValidities = {
        ...state.inputValidities,
        [action.payload.input]: action.payload.isValid,
      };

      const updatedIsFormValid = formKeys.every(
        (key) => updatedValidities[key]
      );

      return {
        ...state,
        inputValues: updatedValue,
        inputValidities: updatedValidities,
        isFormValid: updatedIsFormValid,
      };
    default:
      return state;
  }
}

export function AuthScreen({ navigation }: AuthScreenProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSignup, setIsSignup] = useState(false);

  const initialState: State = {
    inputValues: {
      email: "",
      password: "",
    },
    inputValidities: {
      email: false,
      password: false,
    },
    isFormValid: false,
  };

  const [formState, dispatchFormState] = useReducer(formReducer, initialState);

  const dispatch = useDispatch();

  async function authHandler() {
    let action;

    if (isSignup)
      action = signup(
        formState.inputValues.email,
        formState.inputValues.password
      );
    else
      action = login(
        formState.inputValues.email,
        formState.inputValues.password
      );

    setError(null);
    setIsLoading(true);

    try {
      await dispatch(action);
      setIsLoading(false);
      navigation.navigate("Shop", { screen: "ShopProductsScreen" });
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
    }
  }

  const inputChangeHandler = useCallback(
    (inputIdentifier: string, inputValue: string, inputValidity: boolean) => {
      dispatchFormState({
        type: ActionKind.FORM_INPUT_UPDATE,
        payload: {
          value: inputValue,
          isValid: inputValidity,
          input: inputIdentifier,
        },
      });
    },
    [dispatchFormState]
  );

  useEffect(() => {
    if (error) Alert.alert("An Error Occurred!", error, [{ text: "Okay" }]);
  }, [error]);

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={-500}
      style={styles.screen}
    >
      <LinearGradient colors={["#ffedff", "#ffe3ff"]} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              id="email"
              label="E-mail"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorText="Please enter a valid e-mail address."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <Input
              id="password"
              label="Password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={5}
              autoCapitalize="none"
              errorText="Please enter a valid password."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <View style={styles.buttonContainer}>
              {isLoading && (
                <ActivityIndicator size="small" color={colors.primary} />
              )}
              {!isLoading && (
                <Button
                  title={isSignup ? "Sign Up" : "Login"}
                  onPress={authHandler}
                  color={colors.primary}
                />
              )}
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title={`Switch to ${isSignup ? "Login" : "Sign Up"}`}
                onPress={() => {
                  setIsSignup((prevIsSignup) => !prevIsSignup);
                }}
                color={colors.accent}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 10,
  },
  buttonContainer: {
    marginTop: 10,
  },
});
