
import React from 'react';
import { motion } from 'framer-motion';
import { useCart } from '@/components/cart/CartProvider';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { products } from '@/data/products';
import { getProductsWithoutSizes } from '@/utils/productUtils';

interface ProductGridProps {
  selectedCategory: string;
  selectedPack: string;
  onProductSelect: (product: any) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ 
  selectedCategory, 
  selectedPack, 
  onProductSelect 
}) => {
  const { addItem } = useCart();
  const productsWithoutSizes = getProductsWithoutSizes();

  const filteredProducts = products.filter(product => 
    selectedCategory === 'all' || product.category === selectedCategory
  );

  const handleAddToCart = (product: any, event: React.MouseEvent) => {
    event.stopPropagation();
    
    const cartItem = {
      id: `${product.id}-${Date.now()}`,
      name: product.name,
      price: product.price,
      quantity: 1,
      size: productsWithoutSizes.includes(product.category) ? 'unique' : undefined,
      image: product.image,
      category: product.category
    };

    addItem(cartItem);
  };

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>, product: any) => {
    event.dataTransfer.setData('application/json', JSON.stringify(product));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredProducts.map((product) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card 
            className="cursor-pointer hover:shadow-lg transition-all duration-300 group"
            draggable
            onDragStart={(e) => handleDragStart(e, product)}
            onClick={() => onProductSelect(product)}
          >
            <CardContent className="p-4">
              <div className="aspect-square relative mb-4 overflow-hidden rounded-lg bg-gray-100">
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                )}
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-sm">{product.name}</h3>
                  <Badge variant="secondary" className="text-xs">
                    {product.category}
                  </Badge>
                </div>
                
                <p className="text-lg font-bold text-blue-600">
                  {product.price.toFixed(2)}€
                </p>
                
                <Button
                  onClick={(e) => handleAddToCart(product, e)}
                  className="w-full"
                  size="sm"
                >
                  Ajouter au panier
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default ProductGrid;
