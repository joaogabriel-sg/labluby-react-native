import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootNavigatorParamList = {
  ProductsOverview: undefined;
  ProductDetailScreen: { productId: string; productTitle: string };
  CartScreen: undefined;
  UserProductsScreen: undefined;
  EditProductScreen: { productId?: string };
  AuthScreen: undefined;
  ShopProductsScreen: undefined;
  ShopOrdersScreen: undefined;
  ShopAdminScreen: undefined;
  Startup: undefined;
  Auth: undefined;
  Shop: { screen: string };
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

export type ShopProductsScreenProps = NativeStackScreenProps<
  RootNavigatorParamList,
  "ShopProductsScreen"
>;

export type ShopOrdersScreenProps = NativeStackScreenProps<
  RootNavigatorParamList,
  "ShopOrdersScreen"
>;

export type ShopAdminScreenProps = NativeStackScreenProps<
  RootNavigatorParamList,
  "ShopAdminScreen"
>;

export type AuthScreenProps = NativeStackScreenProps<
  RootNavigatorParamList,
  "AuthScreen"
>;

export type StartupScreenProps = NativeStackScreenProps<
  RootNavigatorParamList,
  "Startup"
>;
