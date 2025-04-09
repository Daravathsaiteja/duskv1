import { useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';

interface ProductFiltersProps {
  onFilterChange: (filters: {
    sizes: string[];
    colors: string[];
    priceRange: [number, number];
    category: string | null;
    gender: string | null;
  }) => void;
}

export function ProductFilters({ onFilterChange }: ProductFiltersProps) {
  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [category, setCategory] = useState<string | null>(null);
  const [gender, setGender] = useState<string | null>(null);

  const handleChange = () => {
    onFilterChange({
      sizes,
      colors,
      priceRange,
      category,
      gender,
    });
  };

  return (
    <div className="space-y-6 rounded-lg border bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Filters</h3>
        <SlidersHorizontal className="h-5 w-5" />
      </div>

      {/* Size Filter */}
      <div>
        <h4 className="mb-2 font-medium">Size</h4>
        <div className="flex flex-wrap gap-2">
          {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
            <button
              key={size}
              onClick={() => {
                const newSizes = sizes.includes(size)
                  ? sizes.filter((s) => s !== size)
                  : [...sizes, size];
                setSizes(newSizes);
                handleChange();
              }}
              className={`rounded-md px-3 py-1 text-sm ${
                sizes.includes(size)
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Color Filter */}
      <div>
        <h4 className="mb-2 font-medium">Color</h4>
        <div className="flex flex-wrap gap-2">
          {['Black', 'White', 'Gray', 'Navy', 'Red', 'Green'].map((color) => (
            <button
              key={color}
              onClick={() => {
                const newColors = colors.includes(color)
                  ? colors.filter((c) => c !== color)
                  : [...colors, color];
                setColors(newColors);
                handleChange();
              }}
              className={`rounded-md px-3 py-1 text-sm ${
                colors.includes(color)
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div>
        <h4 className="mb-2 font-medium">Price Range</h4>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min="0"
            max="1000"
            step="10"
            value={priceRange[1]}
            onChange={(e) => {
              const newRange: [number, number] = [0, parseInt(e.target.value)];
              setPriceRange(newRange);
              handleChange();
            }}
            className="w-full"
          />
          <span className="text-sm text-gray-600">
            Up to ${priceRange[1]}
          </span>
        </div>
      </div>

      {/* Category Filter */}
      <div>
        <h4 className="mb-2 font-medium">Category</h4>
        <select
          value={category || ''}
          onChange={(e) => {
            const value = e.target.value || null;
            setCategory(value);
            handleChange();
          }}
          className="w-full rounded-md border-gray-300"
        >
          <option value="">All Categories</option>
          <option value="hoodies">Hoodies</option>
          <option value="t-shirts">T-Shirts</option>
          <option value="sweatshirts">Sweatshirts</option>
          <option value="pants">Pants</option>
          <option value="accessories">Accessories</option>
        </select>
      </div>

      {/* Gender Filter */}
      <div>
        <h4 className="mb-2 font-medium">Gender</h4>
        <div className="flex gap-4">
          {['Men', 'Women', 'Unisex'].map((g) => (
            <button
              key={g}
              onClick={() => {
                const value = gender === g.toLowerCase() ? null : g.toLowerCase();
                setGender(value);
                handleChange();
              }}
              className={`rounded-md px-4 py-2 text-sm ${
                gender === g.toLowerCase()
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}