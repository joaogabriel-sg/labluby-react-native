import { AnyAction } from "redux";

import { PlacesActions } from "../actions";

import { IPlacesState } from "../types";
import { Place } from "../../shared/types";

const initialState: IPlacesState = {
  places: [],
};

export function placesReducer(
  state: IPlacesState = initialState,
  action: AnyAction
): IPlacesState {
  switch (action.type) {
    case PlacesActions.ADD_PLACE:
      const newPlace: Place = {
        id: action.placeData.id.toString(),
        title: action.placeData.title,
        imageUri: action.placeData.imageUri,
        address: action.placeData.address,
        lat: action.placeData.lat,
        lng: action.placeData.lng,
      };

      return { ...state, places: state.places.concat(newPlace) };
    case PlacesActions.SET_PLACES:
      return {
        ...state,
        places: action.places,
      };
    default:
      return state;
  }
}
