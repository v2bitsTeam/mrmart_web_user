import React, { useState, useContext, createContext } from "react";

const OrderDetailsContext = createContext();
const UpdateOrderDetailsContext = createContext();

export function useOrderDetails() {
  return useContext(OrderDetailsContext);
}

export function useOrderDetailsUpdate() {
  return useContext(UpdateOrderDetailsContext);
}

export const OrderDetailsProvider = ({ children }) => {
  const [orderDetails, setOrderDetails] = useState(null);

  function updateOrderDetails(orderDetails) {
    setOrderDetails(orderDetails);
  }

  return (
    <OrderDetailsContext.Provider value={orderDetails}>
      <UpdateOrderDetailsContext.Provider value={updateOrderDetails}>
        {children}
      </UpdateOrderDetailsContext.Provider>
    </OrderDetailsContext.Provider>
  );
};
