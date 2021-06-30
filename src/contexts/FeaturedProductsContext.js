import React, { useState, useContext, createContext } from "react";

const FeaturedProductsContext = createContext();
const UpdateFeaturedProductsContext = createContext();

export function useFeaturedProducts() {
  return useContext(FeaturedProductsContext);
}

export function useFeaturedProductsUpdate() {
  return useContext(UpdateFeaturedProductsContext);
}

export const FeaturedProductsProvider = ({ children }) => {
  const [featuredProducts, setFeaturedProducts] = useState(null);

  function updateFeaturedProducts(featuredProducts) {
    setFeaturedProducts(featuredProducts);
  }

  return (
    <FeaturedProductsContext.Provider value={featuredProducts}>
      <UpdateFeaturedProductsContext.Provider value={updateFeaturedProducts}>
        {children}
      </UpdateFeaturedProductsContext.Provider>
    </FeaturedProductsContext.Provider>
  );
};
