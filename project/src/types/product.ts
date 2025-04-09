export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  images: string[];
  stock: number;
  sizes: Size[];
  colors: Color[];
  rating: number;
  reviews: number;
  createdAt: string;
  updatedAt: string;
};

export type ProductCategory =
  | 'hoodies'
  | 't-shirts'
  | 'sweatshirts'
  | 'pants'
  | 'accessories';

export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';
export type Color = 'black' | 'white' | 'gray' | 'navy' | 'red' | 'green';