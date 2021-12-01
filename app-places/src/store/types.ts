import { Place } from "../shared/types";

export interface IPlacesState {
  places: Place[];
}

export interface RootState {
  places: IPlacesState;
}
