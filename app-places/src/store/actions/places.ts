import { AnyAction } from "redux";

export enum PlacesActions {
  ADD_PLACE = "ADD_PLACE",
}

export function addPlace(title: string): AnyAction {
  return { type: PlacesActions.ADD_PLACE, placeData: { title } };
}
