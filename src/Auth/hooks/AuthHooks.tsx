import {useLocalStorage} from "react-use";
import {createContext, useContext, useEffect, useMemo} from "react";
import React from "react";
import {backendClient, LoginStatusResponseDto, RefreshTokenResponse} from "../../common/clients/http/BackendClient";
import {PlaybackUpdateResponse} from "../../Playback/models/PlaybackUpdateResponse";

type AuthContextType = {
    userLoggedIn: boolean,
    userName: string,
    login: (jwtToken: string, refreshToken: string) => void,
    logout: () => void
}
const AuthContext = createContext<AuthContextType | null>(null);

export const setToken = (token: string) => {
    localStorage.setItem("dionysus_token", token)
}

export const setRefreshToken = (token: string) => {
    localStorage.setItem("dionysus_refresh_token", token)
}

export const getToken = () => {
    return localStorage.getItem("dionysus_token")
}

export const getRefreshToken = () => {
    return localStorage.getItem("dionysus_refresh_token")
}

export const AuthProvider = ({children}) => {
    const [userName, setUserName] = useLocalStorage("dionysus_userName", '')
    const [userLoggedIn, setUserLoggedIn] = useLocalStorage("dionysus_userFlag", false)

    const login = async (jwtToken: string, refreshToken: string) => {
        setToken(jwtToken)
        setRefreshToken(refreshToken)
    }

    const logout = async () => {
        backendClient.post<PlaybackUpdateResponse, null>('/v1/playback/stop').then(_ => {
            backendClient.post<any, any>("/v1/logout")
                .then(_ => {
                    setUserLoggedIn(false)
                    setToken('')
                    setRefreshToken('')
                })
        })
    }

    const refreshToken = async () => {
        const response = await backendClient.get<RefreshTokenResponse>("/v1/login/refresh",
            null, null, true, {'axios-retry': { retries: 0 }})
        return response.token
    }

    useEffect(() => {
        backendClient.get<LoginStatusResponseDto>("/v1/login/status").then(data => {
                if (data.loggedIn) {
                    setUserLoggedIn(true)
                    setUserName(data.name)
                } else {
                    setUserLoggedIn(false)
                    setUserName('')
                }
            })
            .catch(_ => {
                setUserLoggedIn(false)
                setUserName('')
            })
        const refreshTokenInterval = setInterval(() => {
                if (userLoggedIn) {
                    refreshToken().then(token =>
                        setToken(token)
                    )
                }
            }, 45000)

        return () => { clearInterval(refreshTokenInterval) }
        }, [userLoggedIn, userName])

    const value = useMemo(() => ({
        userLoggedIn, userName, login, logout
    }), [userLoggedIn, userName])

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
    return useContext(AuthContext);
};