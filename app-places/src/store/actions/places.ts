import { AnyAction } from "redux";
import * as FileSystem from "expo-file-system";
import { ThunkAction } from "redux-thunk";

import { insertPlace, fetchPlaces } from "../../shared/helpers";

import { Place } from "../../shared/types";
import { RootState } from "../types";

export enum PlacesActions {
  ADD_PLACE = "ADD_PLACE",
  SET_PLACES = "SET_PLACES",
}

interface DbResultFetchPlaces<T> {
  rows: {
    _array: T[];
  };
}

export function addPlace(
  title: string,
  imageUri: string
): ThunkAction<void, RootState, unknown, AnyAction> {
  return async (dispatch) => {
    const fileName = imageUri.split("/").pop();
    const newPath = `${FileSystem.documentDirectory}${fileName}`;

    try {
      await FileSystem.moveAsync({ from: imageUri, to: newPath });
      const dbResult: any = await insertPlace(
        title,
        newPath,
        "Dummy address",
        15.6,
        12.3
      );

      dispatch({
        type: PlacesActions.ADD_PLACE,
        placeData: { id: dbResult.insertId, title, imageUri: newPath },
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
}

export function loadPlaces(): ThunkAction<void, RootState, unknown, AnyAction> {
  return async (dispatch) => {
    try {
      const dbResult = (await fetchPlaces()) as DbResultFetchPlaces<Place>;
      const places: Place[] = dbResult.rows._array.map((place) => ({
        id: place.id.toString(),
        title: place.title,
        imageUri: place.imageUri,
      }));
      dispatch({ type: PlacesActions.SET_PLACES, places });
    } catch (err) {
      throw err;
    }
  };
}
