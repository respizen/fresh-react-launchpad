import React from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { motion } from 'framer-motion';
import { Package, X } from 'lucide-react';

interface BoxSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (withBox: boolean) => void;
  productName: string;
}

const BoxSelectionModal = ({ isOpen, onClose, onSelect, productName }: BoxSelectionModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-0 bg-white rounded-xl overflow-hidden">
        <div className="relative p-6">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
          
          <h2 className="text-2xl font-['WomanFontBold'] text-[#700100] mb-4">
            Souhaitez-vous ajouter une boîte cadeau ?
          </h2>
          <p className="text-gray-600 mb-6">
            Choisissez si vous souhaitez recevoir votre {productName} dans une élégante boîte cadeau.
          </p>

          <div className="grid grid-cols-2 gap-6">
            {/* With Box Option */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(true)}
              className="relative group"
            >
              <div className="aspect-square rounded-xl border-2 border-[#700100] p-4 flex flex-col items-center justify-center gap-4 hover:bg-[#700100]/5 transition-colors">
                <div className="w-32 h-32 bg-[#F8F8F8] rounded-lg flex items-center justify-center">
                  <Package className="w-16 h-16 text-[#700100]" />
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-[#700100] mb-1">Avec boîte</h3>
                  <p className="text-sm text-gray-600">Emballage premium inclus</p>
                </div>
              </div>
            </motion.button>

            {/* Without Box Option */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(false)}
              className="relative group"
            >
              <div className="aspect-square rounded-xl border-2 border-gray-200 p-4 flex flex-col items-center justify-center gap-4 hover:bg-gray-50 transition-colors">
                <div className="w-32 h-32 bg-[#F8F8F8] rounded-lg flex items-center justify-center">
                  <span className="text-4xl text-gray-300">✕</span>
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-gray-700 mb-1">Sans boîte</h3>
                  <p className="text-sm text-gray-500">Emballage standard</p>
                </div>
              </div>
            </motion.button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BoxSelectionModal;