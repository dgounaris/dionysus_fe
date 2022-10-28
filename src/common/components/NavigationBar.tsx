import {AppBar, Box, Card, Link, Toolbar, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {customTheme} from "../themes/ThemeModuleAugmentation";
import {setToken, useAuth} from "../../Auth/hooks/AuthHooks";
import {NavigationBarRightSide} from "./NavigationBarRightSide";
import {backendClient} from "../clients/http/BackendClient";
import {NavigationBarPlaybackState} from "./NavigationBarPlaybackState";

export const NavigationBar = () => {
    const auth = useAuth()
    const [playbackState, setPlaybackState] = useState<PlaybackState>()

    const refreshPlaybackState = () => {
        backendClient.get<PlaybackStatusResponse>("/v1/state/playback").then(data => {
            setPlaybackState(data.playbackState)
        })
    }

    useEffect(() => {
        const playbackStatusRefreshInterval = setInterval(() => {
            if (auth.userLoggedIn) {
                refreshPlaybackState()
            }
        }, 2000)

        return () => { clearInterval(playbackStatusRefreshInterval) }
    }, [auth.userLoggedIn, auth.userName, playbackState])

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
                        playbackState={playbackState} />
                    <NavigationBarRightSide
                        userLoggedIn={auth.userLoggedIn}
                        userName={auth.userName}
                        onLogoutClick={auth.logout} />
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export enum PlaybackState {
    PLAYING = 'PLAYING',
    PAUSED = 'PAUSED',
    STOPPED = 'STOPPED'
}

type PlaybackStatusResponse = {
    playbackState: PlaybackState
}