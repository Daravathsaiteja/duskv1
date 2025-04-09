import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '@/lib/types';
import { useCartStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import toast from 'react-hot-toast';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const addToCart = useCartStore((state) => state.addItem);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      // Simulated API call
      const mockProduct: Product = {
        id: id!,
        name: 'Premium Tech Hoodie',
        description: 'Ultra-comfortable hoodie with modern cut and technical fabric. Perfect for any weather condition.',
        price: 189.99,
        category: 'hoodies',
        image_url: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=987&q=80',
        stock: 50,
        created_at: new Date().toISOString(),
        is_trending: true,
        is_featured: true,
        available_sizes: ['S', 'M', 'L', 'XL'],
        available_colors: ['Black', 'Gray', 'Navy'],
        rating: 4.8,
        review_count: 128
      };
      
      setProduct(mockProduct);
      setSelectedSize(mockProduct.available_sizes[0]);
      setSelectedColor(mockProduct.available_colors[0]);
      setLoading(false);
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (!product || !selectedSize || !selectedColor) {
      toast.error('Please select size and color');
      return;
    }

    try {
      addToCart({
        id: crypto.randomUUID(),
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity,
        size: selectedSize,
        color: selectedColor,
        imageUrl: product.image_url,
      });
      toast.success('Added to cart!');
    } catch (error) {
      toast.error('Failed to add to cart');
    }
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-lg">Product not found</div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Product Image */}
        <div className="aspect-h-4 aspect-w-3 overflow-hidden rounded-lg">
          <img
            src={product.image_url}
            alt={product.name}
            className="h-full w-full object-cover object-center"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <div className="mt-4">
            <p className="text-2xl font-bold text-gray-900">{formatPrice(product.price)}</p>
          </div>

          <div className="mt-4 space-y-6">
            <p className="text-base text-gray-500">{product.description}</p>
          </div>

          {/* Size Selection */}
          <div className="mt-8">
            <h3 className="text-sm font-medium text-gray-900">Size</h3>
            <div className="mt-2 grid grid-cols-4 gap-2">
              {product.available_sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`flex items-center justify-center rounded-md border py-2 text-sm font-medium ${
                    selectedSize === size
                      ? 'border-black bg-black text-white'
                      : 'border-gray-200 text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div className="mt-8">
            <h3 className="text-sm font-medium text-gray-900">Color</h3>
            <div className="mt-2 grid grid-cols-4 gap-2">
              {product.available_colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`flex items-center justify-center rounded-md border py-2 text-sm font-medium ${
                    selectedColor === color
                      ? 'border-black bg-black text-white'
                      : 'border-gray-200 text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selection */}
          <div className="mt-8">
            <h3 className="text-sm font-medium text-gray-900">Quantity</h3>
            <div className="mt-2 flex items-center gap-2">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="rounded-md border border-gray-200 px-4 py-2 hover:bg-gray-50"
              >
                -
              </button>
              <span className="w-12 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(10, quantity + 1))}
                className="rounded-md border border-gray-200 px-4 py-2 hover:bg-gray-50"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="mt-8 w-full rounded-md bg-black px-6 py-3 text-white hover:bg-black/90"
          >
            Add to Cart
          </button>

          {/* Stock Status */}
          <p className="mt-4 text-sm text-gray-500">
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </p>
        </div>
      </div>
    </div>
  );
}