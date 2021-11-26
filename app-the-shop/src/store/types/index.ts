import { CartItem, Product } from "../../shared/types";

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

export interface RootState {
  products: ProductsState;
  cart: CartState;
}
