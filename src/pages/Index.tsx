import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import ProductCard from "@/components/ProductCard";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 mb-4 text-sm font-medium bg-black/5 backdrop-blur-sm rounded-full">
            Products
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Featured Collection
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            Discover our latest innovations, crafted with precision and care.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Premium Product",
              description: "Experience unparalleled quality and design.",
              imageUrl: "/placeholder.svg",
            },
            {
              title: "Innovation Hub",
              description: "Leading the way in technological advancement.",
              imageUrl: "/placeholder.svg",
            },
            {
              title: "Design Excellence",
              description: "Where form meets function in perfect harmony.",
              imageUrl: "/placeholder.svg",
            },
          ].map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </div>
      <Features />
    </div>
  );
};

export default Index;