import {useLocalStorage} from "react-use";
import {createContext, useContext, useMemo} from "react";
import React from "react";

type AuthContextType = {
    userLoggedIn: boolean,
    login: () => void,
    logout: () => void
}
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({children}) => {
    const [userLoggedIn, setUserLoggedIn] = useLocalStorage("dionysus_userFlag", false)
    const login = async () => {
        setUserLoggedIn(true)
    }
    const logout = async () => {
        setUserLoggedIn(false)
    }

    const value = useMemo(() => ({
        userLoggedIn, login, logout
    }), [userLoggedIn])

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
    return useContext(AuthContext);
};