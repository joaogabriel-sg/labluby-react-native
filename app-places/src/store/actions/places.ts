import { AnyAction } from "redux";
import * as FileSystem from "expo-file-system";
import { ThunkAction } from "redux-thunk";
import axios from "axios";

import { insertPlace, fetchPlaces } from "../../shared/helpers";

import { Place } from "../../shared/types";
import { RootState } from "../types";

const { GOOGLE_MAPS_API_KEY } = process.env;

export enum PlacesActions {
  ADD_PLACE = "ADD_PLACE",
  SET_PLACES = "SET_PLACES",
}

interface DbResultFetchPlaces<T> {
  rows: {
    _array: T[];
  };
}

interface ILocation {
  lat: number;
  lng: number;
}

interface IGoogleMaps {
  results: Array<{ formatted_address: string }> | undefined;
}

export function addPlace(
  title: string,
  imageUri: string,
  location: ILocation
): ThunkAction<void, RootState, unknown, AnyAction> {
  return async (dispatch) => {
    const { data } = await axios.get<IGoogleMaps>(`
    https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${GOOGLE_MAPS_API_KEY}`);

    if (!data || data.results === undefined || !data.results.length) {
      throw new Error("Something went wrong!");
    }

    const address = data.results[0].formatted_address;

    const fileName = imageUri.split("/").pop();
    const newPath = `${FileSystem.documentDirectory}${fileName}`;

    try {
      await FileSystem.moveAsync({ from: imageUri, to: newPath });
      const dbResult: any = await insertPlace(
        title,
        newPath,
        address,
        location.lat,
        location.lng
      );

      const placeData: Place = {
        id: dbResult.insertId,
        title,
        imageUri: newPath,
        address,
        lat: location.lat,
        lng: location.lng,
      };

      dispatch({
        type: PlacesActions.ADD_PLACE,
        placeData,
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
        address: place.address,
        lat: place.lat,
        lng: place.lng,
      }));
      dispatch({ type: PlacesActions.SET_PLACES, places });
    } catch (err) {
      throw err;
    }
  };
}
