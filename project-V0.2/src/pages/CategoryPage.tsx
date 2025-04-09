import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Product } from '@/lib/types';
import { ProductCard } from '@/components/ProductCard';
import toast from 'react-hot-toast';

interface Filters {
  gender: string | null;
  sizes: string[];
  colors: string[];
  priceRange: {
    min: number;
    max: number;
  };
  sortBy: string;
}

export default function CategoryPage() {
  const { category } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters] = useState<Filters>({
    gender: null,
    sizes: [],
    colors: [],
    priceRange: { min: 0, max: 500 },
    sortBy: 'newest'
  });

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      let query = supabase
        .from('products')
        .select('*')
        .eq('category', category);

      if (filters.gender) {
        query = query.eq('gender', filters.gender);
      }

      if (filters.sizes.length > 0) {
        query = query.contains('available_sizes', filters.sizes);
      }

      if (filters.colors.length > 0) {
        query = query.contains('available_colors', filters.colors);
      }

      query = query
        .gte('price', filters.priceRange.min)
        .lte('price', filters.priceRange.max);

      switch (filters.sortBy) {
        case 'price-asc':
          query = query.order('price', { ascending: true });
          break;
        case 'price-desc':
          query = query.order('price', { ascending: false });
          break;
        case 'newest':
          query = query.order('created_at', { ascending: false });
          break;
        case 'popular':
          query = query.order('rating', { ascending: false });
          break;
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching products:', error);
        toast.error('Failed to load products');
      } else {
        setProducts(data || []);
      }

      setLoading(false);
    };

    fetchProducts();
  }, [category, filters]);

  const categoryTitle = category
    ? category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : '';

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold tracking-tight text-gray-900">
        {categoryTitle}
      </h1>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products found</p>
      ) : (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
