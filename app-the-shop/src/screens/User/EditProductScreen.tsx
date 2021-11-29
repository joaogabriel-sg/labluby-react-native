import React, { useCallback, useEffect, useReducer } from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TextInput,
  Platform,
  Alert,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

import { CustomHeaderButton } from "../../components";

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

const formKeys: Array<keyof InputValuesType> = [
  "title",
  "imageUrl",
  "price",
  "description",
];

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

  function textChangeHandler(inputIdentifier: string, text: string) {
    let isValid = false;
    if (text.trim().length > 0) isValid = true;

    dispatchFormState({
      type: ActionKind.FORM_INPUT_UPDATE,
      payload: { value: text, isValid, input: inputIdentifier },
    });
  }

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>title</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.title}
            onChangeText={textChangeHandler.bind(null, "title")}
            keyboardType="default"
          />
          {!formState.inputValidities.title && (
            <Text>Please enter a valid title!</Text>
          )}
        </View>

        <View style={styles.formControl}>
          <Text style={styles.label}>image url</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.imageUrl}
            onChangeText={textChangeHandler.bind(null, "imageUrl")}
          />
        </View>

        {!editedProduct && (
          <View style={styles.formControl}>
            <Text style={styles.label}>price</Text>
            <TextInput
              style={styles.input}
              value={formState.inputValues.price}
              onChangeText={textChangeHandler.bind(null, "price")}
              keyboardType="decimal-pad"
            />
          </View>
        )}

        <View style={styles.formControl}>
          <Text style={styles.label}>description</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.description}
            onChangeText={textChangeHandler.bind(null, "description")}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
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
});
