import { Link } from 'react-router-dom';
import { ShoppingBag, Heart, Star } from 'lucide-react';
import { Product } from '@/lib/types';
import { useCartStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addItem);

  const handleQuickAdd = () => {
    try {
      addToCart({
        id: crypto.randomUUID(),
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        size: product.available_sizes[0],
        color: product.available_colors[0],
        imageUrl: product.image_url,
      });
      toast.success('Added to cart!');
    } catch (error) {
      toast.error('Failed to add to cart');
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-lg bg-white shadow-sm transition-all hover:shadow-md">
      <Link to={`/product/${product.id}`} className="block aspect-h-4 aspect-w-3">
        <img
          src={product.image_url}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 transition-opacity group-hover:bg-opacity-10" />
        
        {/* Product Labels */}
        <div className="absolute left-2 top-2 flex flex-col gap-1">
          {product.is_trending && (
            <span className="rounded bg-blue-500 px-2 py-1 text-xs font-medium text-white">
              Trending
            </span>
          )}
          {product.is_featured && (
            <span className="rounded bg-yellow-500 px-2 py-1 text-xs font-medium text-white">
              Featured
            </span>
          )}
        </div>

        {/* Stock Status */}
        {product.stock <= 5 && (
          <div className="absolute bottom-2 left-2 rounded bg-red-500 px-2 py-1 text-xs font-medium text-white">
            Only {product.stock} left
          </div>
        )}
      </Link>
      
      <div className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <Link to={`/product/${product.id}`}>
            <h3 className="font-medium text-gray-900">{product.name}</h3>
          </Link>
          <button
            onClick={() => toast.success('Added to wishlist!')}
            className="rounded-full p-1 hover:bg-gray-100"
          >
            <Heart className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        <div className="mb-2 flex items-center gap-1">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium">{product.rating}</span>
          <span className="text-sm text-gray-500">
            ({product.review_count} reviews)
          </span>
        </div>

        <p className="mb-2 text-sm text-gray-500">{product.description}</p>
        
        <div className="mb-4">
          <p className="text-lg font-bold text-gray-900">{formatPrice(product.price)}</p>
        </div>
        
        <button
          onClick={handleQuickAdd}
          className="flex w-full items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/90"
        >
          <ShoppingBag className="mr-2 h-5 w-5" />
          Quick Add
        </button>
      </div>
    </div>
  );
}