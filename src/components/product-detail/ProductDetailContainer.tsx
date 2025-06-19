
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCart } from '@/components/cart/CartProvider';
import { getProductsWithoutSizes } from '@/utils/productUtils';

interface ProductDetailContainerProps {
  product: any;
  onBack: () => void;
}

const ProductDetailContainer: React.FC<ProductDetailContainerProps> = ({ product, onBack }) => {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [personalization, setPersonalization] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const productsWithoutSizes = getProductsWithoutSizes();

  const needsSize = !productsWithoutSizes.includes(product.category);

  const handleAddToCart = () => {
    const finalSize = needsSize ? selectedSize : 'unique';
    
    if (needsSize && !selectedSize) {
      alert('Veuillez sélectionner une taille');
      return;
    }

    const cartItem = {
      id: `${product.id}-${Date.now()}`,
      name: product.name,
      price: product.price,
      quantity,
      size: finalSize,
      personalization: personalization || undefined,
      image: product.image,
      category: product.category
    };

    addItem(cartItem);
    onBack();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="max-w-4xl mx-auto"
    >
      <Button
        variant="ghost"
        onClick={onBack}
        className="mb-6 flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Retour
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100">
            {product.image && (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl">{product.name}</CardTitle>
              <Badge variant="secondary">{product.category}</Badge>
            </div>
            <p className="text-3xl font-bold text-blue-600">
              {product.price.toFixed(2)}€
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {product.description && (
              <p className="text-gray-600">{product.description}</p>
            )}

            {needsSize && (
              <div className="space-y-2">
                <Label htmlFor="size">Taille *</Label>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une taille" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.sizes?.map((size: string) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="personalization">Personnalisation (optionnel)</Label>
              <Input
                id="personalization"
                value={personalization}
                onChange={(e) => setPersonalization(e.target.value)}
                placeholder="Texte de personnalisation..."
                maxLength={50}
              />
              <p className="text-xs text-gray-500">
                Maximum 50 caractères ({personalization.length}/50)
              </p>
            </div>

            <div className="space-y-2">
              <Label>Quantité</Label>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="font-medium text-lg w-8 text-center">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-medium">Total:</span>
                <span className="text-2xl font-bold text-blue-600">
                  {(product.price * quantity).toFixed(2)}€
                </span>
              </div>
              
              <Button
                onClick={handleAddToCart}
                className="w-full"
                size="lg"
              >
                Ajouter au panier
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default ProductDetailContainer;
