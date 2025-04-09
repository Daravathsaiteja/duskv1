import Hero from '@/components/Hero';

export default function Home() {
  return (
    <div>
      <Hero
        title="Welcome to North Dusk"
        subtitle="Premium Streetwear for Bold Souls"
        image="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
      />
      
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Latest Collection
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
            Discover our newest arrivals, featuring premium streetwear essentials.
          </p>
        </div>
      </section>
    </div>
  );
}