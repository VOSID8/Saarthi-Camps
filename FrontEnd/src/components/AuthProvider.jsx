import React, { useState, useEffect } from "react"

const AuthContext = React.createContext({
    isLoggedIn: false,
    login: (accessToken) => {},
    logout: () => {},
});

export const AuthContextProvider = (props) => {
    const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) { 
            setUserIsLoggedIn(true)
        }
    }, []);

    const loginHandler = (accessToken) => {
        localStorage.setItem("accessToken", accessToken);
        setUserIsLoggedIn(true);
    }

    const logoutHandler = () => {
        localStorage.removeItem("accessToken");
        setUserIsLoggedIn(false);
    }

    const contextValue = {
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    )
    
}


export default AuthContext;