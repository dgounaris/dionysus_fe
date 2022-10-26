import {AppBar, Box, Link, Toolbar, Typography} from "@mui/material";
import React from "react";
import {customTheme} from "../themes/ThemeModuleAugmentation";
import {useAuth} from "../../Auth/hooks/AuthHooks";
import {NavigationBarRightSide} from "./NavigationBarRightSide";

export const NavigationBar = () => {
    const auth = useAuth()

    return (
        <Box sx={{
            display: 'flex',
            backgroundColor: customTheme.custom.palette.primary.main
        }}>
            <AppBar position="static">
                <Toolbar>
                    <Box flexGrow={1}>
                        <Link href="/" color={customTheme.palette.text.primary} variant="h6" underline="none">
                            Dionysus
                        </Link>
                    </Box>
                    <NavigationBarRightSide userLoggedIn={auth.userLoggedIn} onLogoutClick={auth.logout} />
                </Toolbar>
            </AppBar>
        </Box>
    );
}