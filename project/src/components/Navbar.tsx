import { Link } from 'react-router-dom';
import { ShoppingBag, Search, User } from 'lucide-react';
import { useCartStore } from '@/lib/store';

export default function Navbar() {
  const cartItems = useCartStore((state) => state.items);

  return (
    <nav className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold tracking-tight">
              NORTH DUSK
            </Link>
            <div className="hidden md:ml-8 md:flex md:space-x-8">
              <Link
                to="/"
                className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              >
                Home
              </Link>
              <Link
                to="/shop"
                className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              >
                Shop
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              >
                About
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
              <Search className="h-5 w-5" />
            </button>
            
            <Link
              to="/signin"
              className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
            >
              <User className="h-5 w-5" />
            </Link>
            
            <Link
              to="/cart"
              className="relative rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartItems.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black text-xs text-white">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}