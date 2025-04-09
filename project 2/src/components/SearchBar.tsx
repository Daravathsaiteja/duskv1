import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import Fuse from 'fuse.js';
import { Product } from '@/lib/types';
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
  products: Product[];
}

export function SearchBar({ products }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const navigate = useNavigate();

  const fuse = new Fuse(products, {
    keys: ['name', 'description', 'category'],
    threshold: 0.3,
  });

  useEffect(() => {
    if (query.length > 2) {
      const searchResults = fuse.search(query).map(result => result.item);
      setResults(searchResults);
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
        />
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
      </div>

      {results.length > 0 && (
        <div className="absolute mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-lg">
          {results.map((product) => (
            <button
              key={product.id}
              onClick={() => {
                navigate(`/product/${product.id}`);
                setQuery('');
                setResults([]);
              }}
              className="flex w-full items-center gap-3 px-4 py-2 hover:bg-gray-50"
            >
              <img
                src={product.image_url}
                alt={product.name}
                className="h-12 w-12 rounded-md object-cover"
              />
              <div className="text-left">
                <p className="font-medium text-gray-900">{product.name}</p>
                <p className="text-sm text-gray-500">${product.price}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}