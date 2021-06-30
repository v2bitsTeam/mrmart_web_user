import React, { useState, useContext, createContext } from "react";

const SplashContext = createContext();
const UpdateSplashContext = createContext();

export function useSplash() {
  return useContext(SplashContext);
}

export function useSplashUpdate() {
  return useContext(UpdateSplashContext);
}

export const SplashProvider = ({ children }) => {
  const [splash, setSplash] = useState(true);

  function updateSplash() {
    setSplash(false);
  }

  return (
    <SplashContext.Provider value={splash}>
      <UpdateSplashContext.Provider value={updateSplash}>
        {children}
      </UpdateSplashContext.Provider>
    </SplashContext.Provider>
  );
};
