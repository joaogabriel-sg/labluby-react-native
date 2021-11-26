import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type ShopNavigatorParamList = {
  ProductsOverview: undefined;
  ProductDetailScreen: { productId: string; productTitle: string };
  CartScreen: undefined;
};

export type ProductsOverviewScreenProps = NativeStackScreenProps<
  ShopNavigatorParamList,
  "ProductsOverview"
>;

export type ProductDetailScreenProps = NativeStackScreenProps<
  ShopNavigatorParamList,
  "ProductDetailScreen"
>;

export type CartScreenProps = NativeStackScreenProps<
  ShopNavigatorParamList,
  "CartScreen"
>;
