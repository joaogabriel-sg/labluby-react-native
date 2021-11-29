import React, { useCallback, useEffect, useReducer } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Platform,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

import { CustomHeaderButton, Input } from "../../components";

import { EditProductScreenProps } from "../../routes";
import { createProduct, RootState, updateProduct } from "../../store";

enum ActionKind {
  FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE",
}

interface Action {
  type: ActionKind;
  payload: any;
}

interface InputValuesType {
  title: string;
  imageUrl: string;
  price: string;
  description: string;
}

interface InputValiditiesType {
  title: boolean;
  imageUrl: boolean;
  price: boolean;
  description: boolean;
}
interface State {
  inputValues: InputValuesType;
  inputValidities: InputValiditiesType;
  isFormValid: boolean;
}

type FormKey = keyof InputValuesType;

const formKeys: FormKey[] = ["title", "imageUrl", "price", "description"];

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
export function EditProductScreen({
  navigation,
  route,
}: EditProductScreenProps) {
  const productId = route.params?.productId;
  const editedProduct = useSelector((state: RootState) =>
    state.products.userProducts.find((product) => product.id === productId)
  );

  const dispatch = useDispatch();

  const initialState: State = {
    inputValues: {
      title: editedProduct ? editedProduct.title : "",
      imageUrl: editedProduct ? editedProduct.imageUrl : "",
      description: editedProduct ? editedProduct.description : "",
      price: "",
    },
    inputValidities: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price: editedProduct ? true : false,
    },
    isFormValid: editedProduct ? true : false,
  };
  const [formState, dispatchFormState] = useReducer(formReducer, initialState);

  const submitHandler = useCallback(() => {
    if (!formState.isFormValid) {
      Alert.alert("Wrong input!", "Please check the errors in the form.", [
        { text: "Okay" },
      ]);
      return;
    }

    if (productId && editedProduct) {
      dispatch(
        updateProduct(
          productId,
          formState.inputValues.title,
          formState.inputValues.imageUrl,
          formState.inputValues.description
        )
      );
    } else {
      dispatch(
        createProduct(
          formState.inputValues.title,
          formState.inputValues.description,
          formState.inputValues.imageUrl,
          +formState.inputValues.price
        )
      );
    }

    navigation.goBack();
  }, [dispatch, productId, formState]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Save"
            iconName={
              Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
            }
            onPress={submitHandler}
          />
        </HeaderButtons>
      ),
    });
  }, [submitHandler]);

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

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <ScrollView>
        <View style={styles.form}>
          <Input
            id="title"
            label="Title"
            errorText="Please enter a valid title!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.title : ""}
            isInitiallyValid={!!editedProduct}
            required
          />

          <Input
            id="imageUrl"
            label="Image Url"
            errorText="Please enter a valid image url!"
            keyboardType="default"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.imageUrl : ""}
            isInitiallyValid={!!editedProduct}
            required
          />

          {!editedProduct && (
            <Input
              id="price"
              label="Price"
              errorText="Please enter a valid price!"
              keyboardType="numeric"
              returnKeyType="next"
              onInputChange={inputChangeHandler}
              required
              min={0.1}
            />
          )}

          <Input
            id="description"
            label="Description"
            errorText="Please enter a valid description!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            multiline
            numberOfLines={3}
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.description : ""}
            isInitiallyValid={!!editedProduct}
            required
            minLength={5}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
});
