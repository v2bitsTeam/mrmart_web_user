import React, { useState, useContext, createContext } from "react";

const UserContext = createContext();
const UpdateUserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function useUserUpdate() {
  return useContext(UpdateUserContext);
}

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  function updateUserLoginStatus(userData) {
    setUser(userData);
  }

  return (
    <UserContext.Provider value={user}>
      <UpdateUserContext.Provider value={updateUserLoginStatus}>
        {children}
      </UpdateUserContext.Provider>
    </UserContext.Provider>
  );
};
