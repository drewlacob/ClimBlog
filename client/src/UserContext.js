import React from 'react';

const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userID, setUserID] = React.useState('');
  const [firstName, setFirstName] = React.useState('');

  return (
    <UserContext.Provider
      value={{
        isLoggedIn: [isLoggedIn, setIsLoggedIn],
        userID: [userID, setUserID],
        firstName: [firstName, setFirstName],
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
