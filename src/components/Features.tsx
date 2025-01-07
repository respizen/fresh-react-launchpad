import { useEffect, useRef } from "react";

const Features = () => {
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fadeIn");
          }
        });
      },
      { threshold: 0.1 }
    );

    const features = featuresRef.current?.querySelectorAll(".feature-item");
    features?.forEach((feature) => observer.observe(feature));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={featuresRef}>
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 mb-4 text-sm font-medium bg-black/5 backdrop-blur-sm rounded-full">
            Features
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Designed for Excellence
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            Every detail crafted with precision and purpose.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Intuitive Design",
              description:
                "Experience seamless interaction with thoughtfully crafted interfaces.",
            },
            {
              title: "Premium Quality",
              description:
                "Built with the finest attention to detail and premium materials.",
            },
            {
              title: "Innovation First",
              description:
                "Leading-edge technology meets timeless design principles.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="feature-item opacity-0 p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;