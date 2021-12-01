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
        id: new Date().toString(),
        title: action.placeData.title,
      };

      return { ...state, places: state.places.concat(newPlace) };
    default:
      return state;
  }
}
