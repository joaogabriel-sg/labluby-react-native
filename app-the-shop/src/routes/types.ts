import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type ShopNavigatorParamList = {
  ProductsOverview: undefined;
  ProductDetailScreen: { productId: string; productTitle: string };
};

export type ProductsOverviewScreenProps = NativeStackScreenProps<
  ShopNavigatorParamList,
  "ProductsOverview"
>;

export type ProductDetailScreenProps = NativeStackScreenProps<
  ShopNavigatorParamList,
  "ProductDetailScreen"
>;
