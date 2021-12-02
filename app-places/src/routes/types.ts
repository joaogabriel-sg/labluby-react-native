import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Location = { lat: number; lng: number };

export type RootStackParamList = {
  MapScreen: { readonly: boolean; initialLocation: Location } | undefined;
  NewPlace: { pickedLocation: Location } | undefined;
  Places: undefined;
  PlaceDetail: { placeId: string; placeTitle: string };
};

export type MapScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "MapScreen"
>;

export type NewPlaceScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "NewPlace"
>;

export type PlacesListScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Places"
>;

export type PlaceDetailScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "PlaceDetail"
>;
