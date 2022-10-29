import React, {useState} from "react";
import {Alert, Snackbar} from "@mui/material";

export const ErrorSnack: React.FC<{
    flag: boolean,
    setFlag: (flag: boolean) => void,
    message: string
}> = ({
    flag,
    setFlag,
    message
}) => {
    const handleClose = () => {
        setFlag(false)
    }

    return (
        <Snackbar open={flag} autoHideDuration={5000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    )
}