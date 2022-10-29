import React from "react";
import {Box, Button, Card} from "@mui/material";
import {customTheme} from "../themes/ThemeModuleAugmentation";
import {useNavigate} from "react-router-dom";
import {PlaybackState} from "../models/PlaybackState";

export const NavigationBarPlaybackState: React.FC<{
    userLoggedIn: boolean,
    playbackState: PlaybackState
}> = ({
    userLoggedIn,
    playbackState,
}) => {
    const navigate = useNavigate()

    const onActivePlaybackRedirectClick = () => {
        navigate("/playback/active")
    }

    if (userLoggedIn && playbackState !== PlaybackState.STOPPED) {
        return (
            <Box display="flex" justifyContent="flex-end">
                <Button sx={{
                    "&.MuiButton-root": {
                        backgroundColor: customTheme.palette.background.default
                    }
                }} variant="contained" onClick={onActivePlaybackRedirectClick}>
                    Go back to your active playback
                </Button>
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