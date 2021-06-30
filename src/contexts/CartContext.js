import React, { useState, useContext, createContext } from "react";

const CartContext = createContext();
const UpdateCartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function useCartUpdate() {
  return useContext(UpdateCartContext);
}

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);

  function updateCart(cart) {
    setCart(cart);
  }

  return (
    <CartContext.Provider value={cart}>
      <UpdateCartContext.Provider value={updateCart}>
        {children}
      </UpdateCartContext.Provider>
    </CartContext.Provider>
  );
};
