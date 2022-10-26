import {useLocalStorage} from "react-use";
import {createContext, useContext, useEffect, useMemo} from "react";
import React from "react";
import {backendClient} from "../../common/clients/http/BackendClient";

type AuthContextType = {
    userLoggedIn: boolean,
    logout: () => void
}
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({children}) => {
    const [userLoggedIn, setUserLoggedIn] = useLocalStorage("dionysus_userFlag", false)

    const logout = async () => {
        backendClient.post<any, any>("/v1/logout")
            .then(_ =>
                setUserLoggedIn(false)
            )
    }

    useEffect(() => {
        backendClient.get<any>("/v1/login/status").then(_ =>
                setUserLoggedIn(true)
            ).catch(_ =>
                setUserLoggedIn(false)
            )
        }, [])

    const value = useMemo(() => ({
        userLoggedIn, logout
    }), [userLoggedIn])

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
    return useContext(AuthContext);
};