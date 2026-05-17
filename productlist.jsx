import React from 'react';
import ProductCard from '../ProductCard';

const ProductList = ({ products, category, addToCart }) => {
  const filteredProducts = category === 'All' 
    ? products 
    : products.filter(p => p.category === category);

  if (filteredProducts.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-lg text-neutral-500">No products available in this category.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-16">
      {filteredProducts.map(product => (
        <ProductCard 
          key={product.id} 
          product={product} 
          addToCart={addToCart} 
        />
      ))}
    </div>
  );
};

export default ProductList;