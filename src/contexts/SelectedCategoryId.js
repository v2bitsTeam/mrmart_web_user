import React, { useState, useContext, createContext } from "react";

const SelectedCategoryIdContext = createContext();
const UpdateSelectedCategoryIdContext = createContext();

export function useSelectedCategoryId() {
  return useContext(SelectedCategoryIdContext);
}

export function useSelectedCategoryIdUpdate() {
  return useContext(UpdateSelectedCategoryIdContext);
}

export const SelectedCategoryIdProvider = ({ children }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  function updateSelectedCategoryId(selectedCategoryId) {
    setSelectedCategoryId(selectedCategoryId);
  }

  return (
    <SelectedCategoryIdContext.Provider value={selectedCategoryId}>
      <UpdateSelectedCategoryIdContext.Provider
        value={updateSelectedCategoryId}
      >
        {children}
      </UpdateSelectedCategoryIdContext.Provider>
    </SelectedCategoryIdContext.Provider>
  );
};
