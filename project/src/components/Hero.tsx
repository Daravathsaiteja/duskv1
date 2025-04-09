interface HeroProps {
  title: string;
  subtitle: string;
  image: string;
}

export default function Hero({ title, subtitle, image }: HeroProps) {
  return (
    <section className="relative h-[600px] overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={image}
          alt="Hero background"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      
      <div className="relative flex h-full items-center justify-center text-center">
        <div className="px-4">
          <h1 className="mb-4 text-5xl font-bold text-white">{title}</h1>
          <p className="text-xl text-gray-200">{subtitle}</p>
        </div>
      </div>
    </section>
  );
}