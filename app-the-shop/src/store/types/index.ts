import { CartItem, Order, Product } from "../../shared/types";

export interface ProductsState {
  availableProducts: Product[];
  userProducts: Product[];
}

export interface CartState {
  items: {
    [key: string]: CartItem;
  };
  totalAmount: number;
}

export interface OrdersState {
  orders: Order[];
}

export interface AuthState {
  token: null | string;
  userId: null | string;
}

export interface RootState {
  auth: AuthState;
  cart: CartState;
  orders: OrdersState;
  products: ProductsState;
}
