import { Product, Size, Color } from './product';

export type CartItem = {
  id: string;
  product: Product;
  quantity: number;
  size: Size;
  color: Color;
};

export type Cart = {
  items: CartItem[];
  total: number;
};