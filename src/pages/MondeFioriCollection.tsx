import React from 'react';
import TopNavbar from '../components/TopNavbar';
import BrandNavbarSection from '../components/productsPages/BrandNavbarSection';
import MainNavbarProduct from '../components/MainNavbarProduct';
import Footer from '../components/Footer';
import ProductsSection from '../components/productsPages/ProductsSection';

const MondeFioriCollection = () => {
  return (
    <div className="min-h-screen bg-white">
      <TopNavbar />
      <BrandNavbarSection />
      <MainNavbarProduct />
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-8">Notre Collection</h1>
        <ProductsSection />
      </div>
      <Footer />
    </div>
  );
};

export default MondeFioriCollection;