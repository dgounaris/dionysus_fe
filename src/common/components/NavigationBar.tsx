import {AppBar, Box, Card, Link, Toolbar, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {customTheme} from "../themes/ThemeModuleAugmentation";
import {setToken, useAuth} from "../../Auth/hooks/AuthHooks";
import {NavigationBarRightSide} from "./NavigationBarRightSide";
import {backendClient} from "../clients/http/BackendClient";
import {NavigationBarPlaybackState} from "./NavigationBarPlaybackState";
import {PlaybackState, PlaybackStatusResponse} from "../models/PlaybackState";
import {usePlaybackState} from "../hooks/PlaybackStateHooks";

export const NavigationBar = () => {
    const auth = useAuth()
    const playbackState = usePlaybackState()

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
                    <NavigationBarPlaybackState
                        userLoggedIn={auth.userLoggedIn}
                        playbackState={playbackState.playbackState} />
                    <NavigationBarRightSide
                        userLoggedIn={auth.userLoggedIn}
                        userName={auth.userName}
                        onLogoutClick={auth.logout} />
                </Toolbar>
            </AppBar>
        </Box>
    );
}