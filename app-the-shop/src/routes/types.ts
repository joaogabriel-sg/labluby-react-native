import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type ProductsNavigatorParamList = {
  ProductsOverview: undefined;
  ProductDetailScreen: { productId: string; productTitle: string };
  CartScreen: undefined;
};

export type ProductsOverviewScreenProps = NativeStackScreenProps<
  ProductsNavigatorParamList,
  "ProductsOverview"
>;

export type ProductDetailScreenProps = NativeStackScreenProps<
  ProductsNavigatorParamList,
  "ProductDetailScreen"
>;

export type CartScreenProps = NativeStackScreenProps<
  ProductsNavigatorParamList,
  "CartScreen"
>;
