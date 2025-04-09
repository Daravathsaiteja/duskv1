/*
  # Add product listings and enhance products table

  1. Updates
    - Add trending and featured flags to products table
    - Add color and size options
    - Add sample product data
*/

-- Add new columns to products table
ALTER TABLE products ADD COLUMN IF NOT EXISTS is_trending boolean DEFAULT false;
ALTER TABLE products ADD COLUMN IF NOT EXISTS is_featured boolean DEFAULT false;
ALTER TABLE products ADD COLUMN IF NOT EXISTS available_sizes text[] DEFAULT ARRAY['S', 'M', 'L', 'XL'];
ALTER TABLE products ADD COLUMN IF NOT EXISTS available_colors text[] DEFAULT ARRAY['Black', 'White', 'Gray'];

-- Insert sample products
INSERT INTO products (name, description, price, category, image_url, stock, is_trending, is_featured, available_sizes, available_colors) VALUES
-- Hoodies
('Premium Tech Hoodie', 'Ultra-comfortable hoodie with modern cut and technical fabric', 189.99, 'hoodies', 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80', 50, true, true, ARRAY['S', 'M', 'L', 'XL'], ARRAY['Black', 'Gray', 'Navy']),
('Urban Street Hoodie', 'Streetwear-inspired design with premium cotton blend', 199.99, 'hoodies', 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80', 45, true, false, ARRAY['S', 'M', 'L', 'XL'], ARRAY['Black', 'White']),
('Minimalist Essential Hoodie', 'Clean-cut hoodie with subtle branding', 179.99, 'hoodies', 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80', 60, false, true, ARRAY['S', 'M', 'L', 'XL'], ARRAY['Black', 'Gray', 'White']),

-- T-Shirts
('Premium Cotton Tee', 'Luxury cotton t-shirt with perfect fit', 189.99, 't-shirts', 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80', 75, true, true, ARRAY['S', 'M', 'L', 'XL'], ARRAY['White', 'Black', 'Gray']),
('Graphic Art Tee', 'Limited edition artistic print t-shirt', 195.99, 't-shirts', 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80', 40, true, false, ARRAY['S', 'M', 'L'], ARRAY['Black', 'White']),
('Oversized Statement Tee', 'Modern oversized fit with premium fabric', 184.99, 't-shirts', 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80', 55, false, true, ARRAY['M', 'L', 'XL'], ARRAY['Black', 'White', 'Gray']),

-- Sweatshirts
('Premium Crew Neck', 'Luxurious cotton blend sweatshirt', 199.99, 'sweatshirts', 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80', 35, true, true, ARRAY['S', 'M', 'L', 'XL'], ARRAY['Gray', 'Black', 'Navy']),
('Urban Tech Sweatshirt', 'Technical fabric with modern cut', 189.99, 'sweatshirts', 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80', 45, true, false, ARRAY['S', 'M', 'L'], ARRAY['Black', 'Gray']),
('Minimal Essential Sweatshirt', 'Clean design with premium finish', 194.99, 'sweatshirts', 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80', 50, false, true, ARRAY['S', 'M', 'L', 'XL'], ARRAY['Black', 'White', 'Gray']);