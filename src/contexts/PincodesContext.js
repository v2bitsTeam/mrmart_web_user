import React, { useState, useContext, createContext } from "react";

const PincodesContext = createContext();
const UpdatePincodesContext = createContext();

export function usePincodes() {
  return useContext(PincodesContext);
}

export function usePincodesUpdate() {
  return useContext(UpdatePincodesContext);
}

export const PincodesProvider = ({ children }) => {
  const [pincodes, setPincodes] = useState(null);
  const [userPincode, setUserPincode] = useState(null);

  function updatePincodes(pincodesData) {
    setPincodes(pincodesData);
  }
  function updateUserPincode(pincode) {
    setUserPincode(pincode);
  }

  return (
    <PincodesContext.Provider value={{ pincodes, userPincode }}>
      <UpdatePincodesContext.Provider
        value={{ updatePincodes, updateUserPincode }}
      >
        {children}
      </UpdatePincodesContext.Provider>
    </PincodesContext.Provider>
  );
};
