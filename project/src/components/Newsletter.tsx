import { useState } from 'react';
import { Button } from './ui/Button';
import toast from 'react-hot-toast';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success('Thank you for subscribing!');
    setEmail('');
    setLoading(false);
  };

  return (
    <div className="bg-gray-100 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Subscribe to our newsletter
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Get the latest updates on new products and upcoming sales.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-md">
          <div className="flex gap-4">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
            />
            <Button type="submit" disabled={loading}>
              {loading ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}