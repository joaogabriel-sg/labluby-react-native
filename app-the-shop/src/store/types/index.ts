import { Product } from "../../shared/types";

export interface RootState {
  products: {
    availableProducts: Product[];
    userProducts: Product[];
  };
}
