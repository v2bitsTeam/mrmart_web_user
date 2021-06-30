import React, { useState, useContext, createContext } from "react";

const MyOrdersContext = createContext();
const UpdateMyOrdersContext = createContext();

export function useMyOrders() {
  return useContext(MyOrdersContext);
}

export function useMyOrdersUpdate() {
  return useContext(UpdateMyOrdersContext);
}

export const MyOrdersProvider = ({ children }) => {
  const [myOrders, setMyOrders] = useState(null);

  function updateMyOrders(myOrders) {
    setMyOrders(myOrders);
  }

  return (
    <MyOrdersContext.Provider value={myOrders}>
      <UpdateMyOrdersContext.Provider value={updateMyOrders}>
        {children}
      </UpdateMyOrdersContext.Provider>
    </MyOrdersContext.Provider>
  );
};
