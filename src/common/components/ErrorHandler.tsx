import React from "react";
import {useErrorHandling} from "../hooks/ErrorHandlingHooks";
import {backendClient} from "../clients/http/BackendClient";

export const ErrorHandler = ({children}) => {
    const errorHandling = useErrorHandling()

    const networkErrorHandling = (e) => {
        errorHandling.setNetworkError(true)
    }

    backendClient.defaultErrorHandling = networkErrorHandling

    return children
}