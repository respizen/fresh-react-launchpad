import { useState } from "react";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  title: string;
  description: string;
  imageUrl: string;
}

const ProductCard = ({ title, description, imageUrl }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn(
        "group relative rounded-2xl overflow-hidden bg-white p-6 transition-all duration-300",
        "hover:shadow-xl hover:-translate-y-1"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-square rounded-xl overflow-hidden mb-6">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <span className="inline-block px-3 py-1 text-xs font-medium bg-gray-100 rounded-full mb-3">
        Featured
      </span>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 h-1 bg-gray-900 transform origin-left transition-transform duration-300",
          isHovered ? "scale-x-100" : "scale-x-0"
        )}
      />
    </div>
  );
};

export default ProductCard;