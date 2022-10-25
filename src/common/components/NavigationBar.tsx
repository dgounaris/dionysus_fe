import {AppBar, Box, Link, Toolbar, Typography} from "@mui/material";
import React from "react";
import {customTheme} from "../themes/ThemeModuleAugmentation";

export const NavigationBar = () => {
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
                    <Box display="flex" justifyContent="flex-end">
                        <Link component="button" onClick={() => {}} color={customTheme.palette.text.primary} variant="body1" underline="none">
                            Logout
                        </Link>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}