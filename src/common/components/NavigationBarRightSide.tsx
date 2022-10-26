import React from "react";
import {Box, Link} from "@mui/material";
import {customTheme} from "../themes/ThemeModuleAugmentation";

export const NavigationBarRightSide: React.FC<{
    userLoggedIn: boolean,
    onLogoutClick: () => void
}> = ({
    userLoggedIn,
    onLogoutClick
}) => {
    if (userLoggedIn) {
        return (
            <Box display="flex" justifyContent="flex-end">
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