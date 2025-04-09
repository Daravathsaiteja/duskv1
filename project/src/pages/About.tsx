export default function About() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Our Story
        </h1>
        <p className="mt-4 text-lg text-gray-500">
          North Dusk was founded with a simple mission: to create high-quality, sustainable streetwear that makes a statement. Our journey began in 2025 when a group of fashion enthusiasts came together with a shared vision of redefining urban style.
        </p>
      </div>

      <div className="mt-16">
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Our workshop"
          className="w-full rounded-lg object-cover"
        />
      </div>
    </div>
  );
}