import React, { useState, createContext } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userID, setUserID] = useState("");
  const [firstName, setFirstName] = useState("");
  const [username, setUsername] = useState("");
  return (
    <UserContext.Provider
      value={{
        isLoggedIn: [isLoggedIn, setIsLoggedIn],
        userID: [userID, setUserID],
        firstName: [firstName, setFirstName],
        username: [username, setUsername],
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
