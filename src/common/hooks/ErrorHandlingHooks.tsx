import {createContext, useContext, useMemo, useState} from "react";
import React from "react";
import {ErrorSnack} from "../components/ErrorSnack";

type ErrorHandlingContextType = {
    networkError: boolean,
    setNetworkError: (boolean) => void
}
const ErrorHandlingContext = createContext<ErrorHandlingContextType | null>(null);

export const ErrorHandlingProvider = ({children}) => {
    const [networkError, setNetworkError] = useState<boolean>(false)

    const value = useMemo(() => ({
        networkError,
        setNetworkError
    }), [])

    return <ErrorHandlingContext.Provider value={value}>
        {children}
        <ErrorSnack
            flag={networkError}
            setFlag={setNetworkError}
            message="Error connecting to the server, please try again later"
        />
    </ErrorHandlingContext.Provider>;
}

export const useErrorHandling = () => {
    return useContext(ErrorHandlingContext);
};