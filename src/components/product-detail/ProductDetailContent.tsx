import React from 'react';
import { Info, ArrowRight } from 'lucide-react';

interface ProductDetailContentProps {
  description: string;
  material: string;
  color: string;
  id: number;
}

const ProductDetailContent = ({ description, material, color, id }: ProductDetailContentProps) => {
  return (
    <div className="space-y-6 p-6">
      <p className="text-gray-600 leading-relaxed">{description}</p>

      <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
        <div className="flex items-start gap-2">
          <Info className="h-4 w-4 text-[#700100] mt-1" />
          <div>
            <h4 className="font-medium text-gray-900">Détails du produit</h4>
            <ul className="mt-2 space-y-2 text-gray-600">
              <li>• Matière: {material}</li>
              <li>• Couleur: {color}</li>
              <li>• Référence: {id.toString().padStart(6, '0')}</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="space-y-3 bg-gray-50 p-4 rounded-lg text-sm">
        <div className="space-y-2 text-gray-600">
          <div className="flex items-center gap-2">
            <ArrowRight className="h-4 w-4 text-[#700100]" />
            Livraison gratuite en Tunisie
          </div>
          <div className="flex items-center gap-2">
            <ArrowRight className="h-4 w-4 text-[#700100]" />
            Retours gratuits sous 14 jours
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailContent;