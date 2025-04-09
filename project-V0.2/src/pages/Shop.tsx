import { useState, useEffect } from 'react';
import { Product } from '@/lib/types';
import { ProductCard } from '@/components/ProductCard';
import { SearchBar } from '@/components/SearchBar';
import { ProductFilters } from '@/components/ProductFilters';
import { SlidersHorizontal } from 'lucide-react';

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Simulated product data
    const mockProducts: Product[] = [
      {
        id: '1',
        name: 'Premium Tech Hoodie',
        description: 'Ultra-comfortable hoodie with modern cut and technical fabric',
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
      },
      // ... other products
    ];

    setProducts(mockProducts);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-lg">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Shop</h1>
          <div className="flex items-center gap-4">
            <SearchBar products={products} />
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
            >
              <SlidersHorizontal className="h-5 w-5" />
              Filters
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Filters */}
          {showFilters && (
            <div className="lg:col-span-1">
              <ProductFilters
                onFilterChange={(filters) => {
                  console.log('Filters changed:', filters);
                  // Implement filter logic here
                }}
              />
            </div>
          )}

          {/* Product Grid */}
          <div className={showFilters ? 'lg:col-span-3' : 'lg:col-span-4'}>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
