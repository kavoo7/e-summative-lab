import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { MOCK_PRODUCTS } from "../data/mockCatalog.js";

const ProductContext = createContext(null);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      setProducts(MOCK_PRODUCTS);
    } catch (err) {
      setError("Unable to load product catalog.");
    } finally {
      setLoading(false);
    }
  }, []);

  const addProduct = async (product) => {
    const nextId = String(
      Math.max(0, ...products.map((item) => Number(item.id))) + 1,
    );
    const newProduct = {
      ...product,
      id: nextId,
      reviews: 0,
      isFavorite: false,
      badge: "",
    };
    setProducts((prev) => [...prev, newProduct]);
  };

  const updateProduct = async (productId, update) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, ...update } : item)),
    );
  };

  const value = useMemo(
    () => ({ products, loading, error, addProduct, updateProduct }),
    [products, loading, error],
  );

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within ProductProvider");
  }
  return context;
};
