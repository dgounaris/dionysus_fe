import React, {useEffect, useMemo, useState} from "react";
import {Box, Button, Grid, Typography} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import {PlaybackStartRequest} from "../models/PlaybackStartRequest";
import {backendClient} from "../../common/clients/http/BackendClient";
import {PlaybackState, PlaybackUpdateResponse} from "../models/PlaybackUpdateResponse";
import StopIcon from '@mui/icons-material/Stop';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const Playback = () => {
    useEffect(() => {
        window.addEventListener(
            'unload',
            onPageExit
        )
        return () => {
            window.removeEventListener('unload', onPageExit)
        }
    }, [])

    const onPageExit = () => {
        backendClient.post<PlaybackUpdateResponse, null>('/v1/playback/stop').then(_ => {})
    }

    const pause = () => {
        backendClient.post<PlaybackUpdateResponse, null>('/v1/playback/pause').then(data => {
        })
    }
    const resume = () => {
        backendClient.post<PlaybackUpdateResponse, null>('/v1/playback/resume').then(data => {
        })
    }
    const next = () => {
        backendClient.post<PlaybackUpdateResponse, null>('/v1/playback/next').then(data => {
        })
    }
    const stop = () => {
        backendClient.post<PlaybackUpdateResponse, null>('/v1/playback/stop').then(data => {
        })
    }

    let navigate = useNavigate()

    const pauseResumeButton = useMemo(() => {
        if (PlaybackState.PLAYING === PlaybackState.PLAYING) {
            return <Button variant="contained" onClick={pause}>
                <PauseIcon />
            </Button>
        } else {
            return <Button variant="contained" onClick={resume}>
                <PlayArrowIcon />
            </Button>
        }
    }, [])

    return (
        <Box sx={{
            textAlign: 'center'
        }}>
            <Box sx={{ margin: '2rem' }}>
                <Typography fontSize='1.5rem'>
                    Current status: todo...
                </Typography>
            </Box>
            <Box sx={{ margin: '1.5rem' }}>
                <Grid container justifyContent='center' spacing={1}>
                    <Grid item lg={1} md={4} xs={12}>
                        <Button variant="contained" onClick={stop}>
                            <StopIcon />
                        </Button>
                    </Grid>
                    <Grid item lg={1} md={4} xs={12}>
                        {pauseResumeButton}
                    </Grid>
                    <Grid item lg={1} md={4} xs={12}>
                        <Button variant="contained" onClick={next}>
                            <SkipNextIcon />
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            <Box position='fixed' bottom={0} width='100%' hidden={false}>
                {
                    /*<SpotifyPlayer
                        token={playbackToken}
                        showSaveIcon={true}
                        name="Dionysus"
                        autoPlay={false}
                        initialVolume={0.5}
                        styles={{
                            activeColor: customTheme.palette.primary.dark,
                            bgColor: customTheme.palette.background.default,
                            color: customTheme.palette.primary.main,
                            sliderColor: customTheme.palette.primary.light,
                            trackArtistColor: '#ccc',
                            trackNameColor: '#fff',
                        }}
                    />*/
                }
            </Box>
        </Box>
    );
}

export default Playback;
