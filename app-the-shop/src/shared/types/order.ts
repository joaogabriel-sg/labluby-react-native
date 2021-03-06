import { CartItem } from "./cartItem";

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  date: Date;
}
