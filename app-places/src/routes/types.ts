import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  MapScreen: undefined;
  NewPlace: undefined;
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
