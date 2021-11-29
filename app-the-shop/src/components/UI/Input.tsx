import React, { useReducer, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

interface Props extends TextInputProps {
  id: string;
  label: string;
  errorText: string;
  initialValue?: string;
  isInitiallyValid?: boolean;
  required?: boolean;
  email?: boolean;
  min?: number;
  max?: number;
  minLength?: number;
  onInputChange: (id: string, value: string, isValid: boolean) => void;
}

enum ActionKinds {
  INPUT_CHANGE = "INPUT_CHANGE",
  INPUT_BLUR = "INPUT_BLUR",
}

interface Action {
  type: ActionKinds;
  payload?: any;
}

interface State {
  value: string;
  isValid: boolean;
  touched: boolean;
}

function inputReducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionKinds.INPUT_CHANGE:
      return {
        ...state,
        value: action.payload.value,
        isValid: action.payload.isValid,
      };
    case ActionKinds.INPUT_BLUR:
      return {
        ...state,
        touched: true,
      };
    default:
      return state;
  }
}

export function Input({
  id,
  label,
  errorText,
  initialValue,
  isInitiallyValid,
  required,
  email,
  min,
  max,
  minLength,
  onInputChange,
  ...rest
}: Props) {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: initialValue ? initialValue : "",
    isValid: !!isInitiallyValid,
    touched: false,
  });

  function textChangeHandler(text: string) {
    if (!inputState.touched) dispatch({ type: ActionKinds.INPUT_BLUR });

    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let isValid = true;

    if (required && text.trim().length === 0) {
      isValid = false;
    }
    if (email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (min != null && +text < min) {
      isValid = false;
    }
    if (max != null && +text > max) {
      isValid = false;
    }
    if (minLength != null && text.length < minLength) {
      isValid = false;
    }

    dispatch({
      type: ActionKinds.INPUT_CHANGE,
      payload: { value: text, isValid },
    });
  }

  function lostFocusHandler() {
    dispatch({ type: ActionKinds.INPUT_BLUR });
  }

  useEffect(() => {
    if (inputState.touched)
      onInputChange(id, inputState.value, inputState.isValid);
  }, [inputState, id, onInputChange]);

  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        {...rest}
        style={styles.input}
        value={inputState.value}
        onChangeText={textChangeHandler}
        onBlur={lostFocusHandler}
      />
      {!inputState.isValid && inputState.touched && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorText}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  formControl: {
    width: "100%",
  },
  label: {
    marginVertical: 8,
    fontFamily: "open-sans-bold",
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#cccccc",
    borderBottomWidth: 1,
  },
  errorContainer: {
    marginVertical: 5,
  },
  errorText: {
    fontFamily: "open-sans",
    fontSize: 13,
    color: "#aa0000",
  },
});
