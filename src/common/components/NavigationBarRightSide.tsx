import React from "react";
import {Box, Link, Typography} from "@mui/material";
import {customTheme} from "../themes/ThemeModuleAugmentation";

export const NavigationBarRightSide: React.FC<{
    userLoggedIn: boolean,
    userName: string,
    onLogoutClick: () => void
}> = ({
    userLoggedIn,
    userName,
    onLogoutClick
}) => {
    if (userLoggedIn) {
        return (
            <Box display="flex" justifyContent="flex-end">
                <Typography sx={{
                    marginX: '1rem'
                }} fontSize='1.2rem'>{userName}</Typography>
                <Link component="button" onClick={onLogoutClick} color={customTheme.palette.text.primary} variant="body1" underline="none">
                    Logout
                </Link>
            </Box>
        )
    }
    else {
        return (
            <Box display="flex" justifyContent="flex-end">
            </Box>
        )
    }
}