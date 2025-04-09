import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';

export default function Cart() {
  const { items, removeItem, updateQuantity, total } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Your cart is empty</h2>
          <p className="mt-4 text-gray-500">Start shopping to add items to your cart.</p>
          <Link
            to="/shop"
            className="mt-8 inline-block rounded-md bg-black px-6 py-3 text-white hover:bg-black/90"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold">Shopping Cart</h1>
      
      <div className="mt-12">
        <div className="rounded-lg border bg-white shadow-sm">
          <ul className="divide-y">
            {items.map((item) => (
              <li key={item.id} className="flex gap-6 p-6">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="h-24 w-24 rounded-md object-cover"
                />
                
                <div className="flex flex-1 flex-col">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Size: {item.size} • Color: {item.color}
                      </p>
                    </div>
                    <p className="font-medium">{formatPrice(item.price)}</p>
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="rounded-md border px-3 py-1 hover:bg-gray-50"
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, Math.min(10, item.quantity + 1))}
                        className="rounded-md border px-3 py-1 hover:bg-gray-50"
                      >
                        +
                      </button>
                    </div>
                    
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          
          <div className="border-t p-6">
            <div className="flex justify-between">
              <p className="text-lg font-medium">Total</p>
              <p className="text-lg font-medium">{formatPrice(total)}</p>
            </div>
            
            <Link
              to="/checkout"
              className="mt-6 block w-full rounded-md bg-black px-6 py-3 text-center text-white hover:bg-black/90"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}