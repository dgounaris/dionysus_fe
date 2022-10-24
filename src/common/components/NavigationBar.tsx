import {AppBar, Box, Toolbar, Typography} from "@mui/material";
import {Link} from "react-router-dom";
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
                    <Link to="/">
                        <Typography variant="h6" sx={{ flexGrow: 1 }}>
                            Dionysus
                        </Typography>
                    </Link>
                </Toolbar>
            </AppBar>
        </Box>
    );
}