/*
  # Add cart functionality and enhance user profiles

  1. Updates to profiles table
    - Add phone number
    - Add shipping address fields
    - Add billing address fields
    - Add preferences

  2. New Tables
    - `cart_items`
      - Track user's shopping cart items
      - Store quantity and selected options
    - `addresses`
      - Store user addresses for shipping/billing

  3. Security
    - Enable RLS on new tables
    - Add policies for authenticated users
*/

-- Enhance profiles table with more details
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS phone_number text,
ADD COLUMN IF NOT EXISTS date_of_birth date,
ADD COLUMN IF NOT EXISTS preferences jsonb DEFAULT '{}'::jsonb;

-- Create addresses table
CREATE TABLE IF NOT EXISTS addresses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE,
  type text NOT NULL CHECK (type IN ('shipping', 'billing')),
  is_default boolean DEFAULT false,
  full_name text NOT NULL,
  address_line1 text NOT NULL,
  address_line2 text,
  city text NOT NULL,
  state text NOT NULL,
  postal_code text NOT NULL,
  country text NOT NULL DEFAULT 'US',
  phone text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create cart_items table
CREATE TABLE IF NOT EXISTS cart_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE,
  product_id uuid REFERENCES products ON DELETE CASCADE,
  quantity integer NOT NULL DEFAULT 1,
  size text NOT NULL,
  color text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE (user_id, product_id, size, color)
);

-- Enable RLS
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

-- Policies for addresses
CREATE POLICY "Users can manage their own addresses"
  ON addresses
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policies for cart items
CREATE POLICY "Users can manage their own cart"
  ON cart_items
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Update products table with new categories
DO $$
BEGIN
  ALTER TABLE products
    DROP CONSTRAINT IF EXISTS products_category_check;
    
  ALTER TABLE products
    ADD CONSTRAINT products_category_check
    CHECK (category IN (
      'hoodies',
      'sweatshirts',
      't-shirts',
      'long-sleeve-shirts',
      'joggers',
      'sweatpants',
      'bomber-jackets',
      'windbreakers',
      'denim-jackets',
      'beanies',
      'baseball-caps',
      'bucket-hats',
      'sneakers',
      'tote-bags',
      'socks',
      'jewelry',
      'limited-edition',
      'sustainable'
    ));
END $$;