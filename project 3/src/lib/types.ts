export type User = {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  phone_number?: string;
  date_of_birth?: string;
  preferences?: Record<string, unknown>;
};

export type CartItem = {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
  imageUrl: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  stock: number;
  created_at: string;
  is_trending: boolean;
  is_featured: boolean;
  available_sizes: string[];
  available_colors: string[];
  rating?: number;
  review_count?: number;
};