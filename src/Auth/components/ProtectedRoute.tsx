import {useAuth} from "../hooks/AuthHooks";
import { Navigate } from "react-router-dom";
import React from "react";

export const ProtectedRoute = ({children}) => {
    const { userLoggedIn } = useAuth()

    if (!userLoggedIn) {
        return <Navigate to="/" />
    }
    return children
}