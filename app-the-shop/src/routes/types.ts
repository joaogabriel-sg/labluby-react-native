import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootNavigatorParamList = {
  ProductsOverview: undefined;
  ProductDetailScreen: { productId: string; productTitle: string };
  CartScreen: undefined;
  UserProductsScreen: undefined;
  EditProductScreen: { productId?: string };
};

export type ProductsOverviewScreenProps = NativeStackScreenProps<
  RootNavigatorParamList,
  "ProductsOverview"
>;

export type ProductDetailScreenProps = NativeStackScreenProps<
  RootNavigatorParamList,
  "ProductDetailScreen"
>;

export type CartScreenProps = NativeStackScreenProps<
  RootNavigatorParamList,
  "CartScreen"
>;

export type UserProductsScreenProps = NativeStackScreenProps<
  RootNavigatorParamList,
  "UserProductsScreen"
>;

export type EditProductScreenProps = NativeStackScreenProps<
  RootNavigatorParamList,
  "EditProductScreen"
>;
