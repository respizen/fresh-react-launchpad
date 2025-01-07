import { useEffect, useRef } from "react";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrolled = window.scrollY;
        heroRef.current.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        ref={heroRef}
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(45deg, rgba(255,255,255,0.8), rgba(255,255,255,0.4))",
        }}
      />
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 animate-fadeIn">
        <span className="inline-block px-4 py-1 mb-4 text-sm font-medium bg-black/5 backdrop-blur-sm rounded-full">
          Introducing Innovation
        </span>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-gray-900 mb-6">
          Create the Future
        </h1>
        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-600 mb-8">
          Experience design perfection with our revolutionary approach to digital
          products.
        </p>
        <button className="px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 shadow-lg hover:shadow-xl">
          Discover More
        </button>
      </div>
    </div>
  );
};

export default Hero;