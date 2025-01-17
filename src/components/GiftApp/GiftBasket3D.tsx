import React, { useState } from 'react';
import { Product } from '@/types/product';
import { playTickSound } from '@/utils/audio';
import { toast } from '@/hooks/use-toast';
import GiftPackContainer from './containers/GiftPackContainer';
import AddItemDialog from './dialogs/AddItemDialog';
import ProductDetailsDialog from './dialogs/ProductDetailsDialog';
import AddItemParticles from '../effects/AddItemParticles';
import BoxRevealAnimation from './animations/BoxRevealAnimation';
import { packSpaceLabels } from '@/config/packSpaceLabels';
import { packSpaceDimensions } from '@/config/packSpaceDimensions';

interface GiftBasket3DProps {
  items: Product[];
  onItemDrop: (item: Product, size: string, personalization: string) => void;
  onRemoveItem?: (index: number) => void;
  containerCount: number;
  onContainerSelect: (index: number) => void;
  onUpdateItem?: (index: number, size: string, personalization: string) => void;
}

const GiftBasket3D = ({ 
  items, 
  onItemDrop, 
  onRemoveItem,
  containerCount,
  onContainerSelect,
  onUpdateItem
}: GiftBasket3DProps) => {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const [personalization, setPersonalization] = useState('');
  const [droppedItem, setDroppedItem] = useState<Product | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [editingIndex, setEditingIndex] = useState<number>(-1);
  const [targetContainer, setTargetContainer] = useState<number>(0);
  const [particlePosition, setParticlePosition] = useState<{ x: number; y: number } | null>(null);

  const packType = sessionStorage.getItem('selectedPackType') || 'Pack Prestige';
  const spaceLabels = packSpaceLabels[packType];
  const spaceDimensions = packSpaceDimensions[packType];

  const handleDrop = (containerId: number) => (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const item = JSON.parse(e.dataTransfer.getData('product'));
    setDroppedItem(item);
    setTargetContainer(containerId);
    onContainerSelect(containerId);
    setShowAddDialog(true);
    playTickSound();
    
    const rect = e.currentTarget.getBoundingClientRect();
    setParticlePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });

    setTimeout(() => {
      setParticlePosition(null);
    }, 1000);
  };

  const handleConfirm = () => {
    if (droppedItem && selectedSize) {
      onItemDrop(droppedItem, selectedSize, personalization);
      setShowAddDialog(false);
      setSelectedSize('');
      setPersonalization('');
      setDroppedItem(null);
      toast({
        title: "Article ajouté au pack",
        description: "L'article a été ajouté avec succès à votre pack cadeau",
        style: {
          backgroundColor: '#700100',
          color: 'white',
          border: '1px solid #590000',
        },
        duration: 3000,
      });
    }
  };

  const handleEditConfirm = () => {
    if (editingIndex !== -1 && onUpdateItem) {
      onUpdateItem(editingIndex, selectedSize, personalization);
      setShowEditDialog(false);
      setSelectedSize('');
      setPersonalization('');
      setEditingIndex(-1);
      toast({
        title: "Article modifié",
        description: "Les modifications ont été enregistrées avec succès",
        style: {
          backgroundColor: '#700100',
          color: 'white',
          border: '1px solid #590000',
        },
        duration: 3000,
      });
    }
  };

  const handleEditClick = (index: number, item: Product) => {
    setEditingIndex(index);
    setSelectedSize(item.size || '');
    setPersonalization(item.personalization || '');
    setSelectedProduct(item);
    setShowEditDialog(true);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  const getContainerTitle = (index: number) => {
    if (containerCount === 2) {
      return index === 0 ? spaceLabels?.mainSpace : spaceLabels?.mainSpace2;
    }
    if (containerCount === 3) {
      if (index === 0) return spaceLabels?.mainSpace;
      if (index === 1) return spaceLabels?.secondarySpace;
      return spaceLabels?.tertiarySpace;
    }
    return spaceLabels?.mainSpace;
  };

  return (
    <div className="space-y-2">
      <div className="p-6 bg-black/95 border border-gray-800 rounded-xl shadow-2xl relative">
        <BoxRevealAnimation containerCount={containerCount} />
        
        {containerCount === 3 ? (
          <div className="flex gap-3">
            <div className={`${spaceDimensions.main.width} ${spaceDimensions.main.height}`}>
              <GiftPackContainer
                title={getContainerTitle(0) || "ESPACE PRINCIPAL"}
                item={items[0]}
                onDrop={handleDrop(0)}
                onItemClick={handleProductClick}
                onRemoveItem={() => onRemoveItem?.(0)}
                containerIndex={0}
                className="h-full bg-black/90 backdrop-blur-sm shadow-2xl rounded-xl border border-gray-800 transition-all duration-300 hover:shadow-2xl hover:border-gray-700"
                imageScale={1.3}
              />
              {particlePosition && targetContainer === 0 && (
                <AddItemParticles position={particlePosition} />
              )}
            </div>
            
            <div className={`${spaceDimensions.secondary?.width || 'w-[40%]'} flex flex-col gap-3`}>
              <div className={spaceDimensions.secondary?.height || 'h-[291px]'}>
                <GiftPackContainer
                  title={getContainerTitle(1) || "ESPACE SECONDAIRE"}
                  item={items[1]}
                  onDrop={handleDrop(1)}
                  onItemClick={handleProductClick}
                  onRemoveItem={() => onRemoveItem?.(1)}
                  containerIndex={1}
                  className="h-full bg-black/90 backdrop-blur-sm shadow-2xl rounded-xl border border-gray-800 transition-all duration-300 hover:shadow-2xl hover:border-gray-700"
                  imageScale={1.3}
                />
                {particlePosition && targetContainer === 1 && (
                  <AddItemParticles position={particlePosition} />
                )}
              </div>
              <div className={spaceDimensions.tertiary?.height || 'h-[291px]'}>
                <GiftPackContainer
                  title={getContainerTitle(2) || "ESPACE TERTIAIRE"}
                  item={items[2]}
                  onDrop={handleDrop(2)}
                  onItemClick={handleProductClick}
                  onRemoveItem={() => onRemoveItem?.(2)}
                  containerIndex={2}
                  className="h-full bg-black/90 backdrop-blur-sm shadow-2xl rounded-xl border border-gray-800 transition-all duration-300 hover:shadow-2xl hover:border-gray-700"
                  imageScale={1.3}
                />
                {particlePosition && targetContainer === 2 && (
                  <AddItemParticles position={particlePosition} />
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {Array.from({ length: containerCount }).map((_, index) => (
              <div key={index} className={`relative ${spaceDimensions.main.height}`}>
                <GiftPackContainer
                  title={getContainerTitle(index) || "ESPACE PRINCIPAL"}
                  item={items[index]}
                  onDrop={handleDrop(index)}
                  onItemClick={handleProductClick}
                  onRemoveItem={() => onRemoveItem?.(index)}
                  containerIndex={index}
                  className="h-full bg-black/90 backdrop-blur-sm shadow-2xl rounded-xl border border-gray-800 transition-all duration-300 hover:shadow-2xl hover:border-gray-700"
                />
                {particlePosition && targetContainer === index && (
                  <AddItemParticles position={particlePosition} />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <AddItemDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        droppedItem={droppedItem}
        selectedSize={selectedSize}
        personalization={personalization}
        onSizeSelect={setSelectedSize}
        onPersonalizationChange={setPersonalization}
        onConfirm={handleConfirm}
      />

      <AddItemDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        droppedItem={selectedProduct}
        selectedSize={selectedSize}
        personalization={personalization}
        onSizeSelect={setSelectedSize}
        onPersonalizationChange={setPersonalization}
        onConfirm={handleEditConfirm}
        isEditing={true}
      />

      <ProductDetailsDialog
        open={showProductModal}
        onOpenChange={setShowProductModal}
        product={selectedProduct}
      />
    </div>
  );
};

export default GiftBasket3D;