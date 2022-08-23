import React from 'react'

const UserContext = React.createContext()

const UserProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [userID, setUserID] = React.useState("");

    return (
        <UserContext.Provider value={{ isLoggedIn: [isLoggedIn, setIsLoggedIn], userID: [userID, setUserID] }}>
                {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider };
