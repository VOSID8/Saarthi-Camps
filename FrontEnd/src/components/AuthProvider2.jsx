import React, { useState, useEffect } from "react"
import api_url from "../config";
import axios from "axios";
const url = api_url + "user/profile";

const AuthContext = React.createContext({
    isLoggedIn: false,
    isAdmin: false,
    login: (accessToken) => {},
    logout: () => {},
    admin: (role) => {},
});

export const AuthContextProvider = (props) => {
    const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);
    const [userIsAdmin, setUserIsAdmin] = useState(false);

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            setUserIsLoggedIn(true);
            
            const config = {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            }

            try {
                axios
                    .get(url, config)
                    .then((response) => {
                        if (!response.data.error && response.data.role === "admin") {
                            setUserIsAdmin(true);
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } catch (error) {
                console.log(error)
            }
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

    const adminHandler = (role) => {
        if(role === "admin"){
            setUserIsAdmin(true);
        }
        else {
            setUserIsAdmin(false);
        }
    }

    const contextValue = {
        isLoggedIn: userIsLoggedIn,
        isAdmin: userIsAdmin,
        login: loginHandler,
        logout: logoutHandler,
        admin: adminHandler,
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    )
    
}


export default AuthContext;