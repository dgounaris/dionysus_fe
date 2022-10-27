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
import {PlaybackClientResponse} from "../models/PlaybackClientResponse";

const Playback = () => {
    const location = useLocation()
    const playbackDevice = location.state.playbackDevice
    const fadeDetails = location.state.fadeDetails

    const [playbackToken, setPlaybackToken] = useState<string>('');
    const [playbackStatus, setPlaybackStatus] = useState<PlaybackState | null>(null);

    const startPlayback = async () => {
        const playbackDeviceDetails = await backendClient.get<PlaybackClientResponse>("/v1/playback/client")
        setPlaybackToken(playbackDeviceDetails.token)
        const body: PlaybackStartRequest = {
            playbackDetails: {
                selectedDeviceId: playbackDevice.id,
                selectedDeviceType: playbackDevice.type,
                selectedDeviceVolumePercent: playbackDevice.volumePercent,
                fadeDetails: {
                    fadeMilliseconds: fadeDetails.fadeMilliseconds,
                    volumeChangeIntervalMilliseconds: fadeDetails.volumeChangeIntervalMilliseconds,
                    volumeTotalReduction: fadeDetails.volumeTotalReduction
                }
            }
        }
        return backendClient.post<PlaybackUpdateResponse, PlaybackStartRequest>(
            '/v1/playback/play/auto',
            null,
            body
        )
    }

    useEffect(() => {
        if (playbackStatus === null) {
            startPlayback().then(data => {
                setPlaybackStatus(data.playbackState)
            })
        }
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
            setPlaybackStatus(data.playbackState)
        })
    }
    const resume = () => {
        backendClient.post<PlaybackUpdateResponse, null>('/v1/playback/resume').then(data => {
            setPlaybackStatus(data.playbackState)
        })
    }
    const next = () => {
        backendClient.post<PlaybackUpdateResponse, null>('/v1/playback/next').then(data => {
            setPlaybackStatus(data.playbackState)
        })
    }
    const stop = () => {
        backendClient.post<PlaybackUpdateResponse, null>('/v1/playback/stop').then(data => {
            setPlaybackStatus(data.playbackState)
        })
    }

    let navigate = useNavigate()

    const pauseResumeButton = useMemo(() => {
        if (playbackStatus === PlaybackState.PLAYING) {
            return <Button variant="contained" onClick={pause}>
                <PauseIcon />
            </Button>
        } else {
            return <Button variant="contained" onClick={resume}>
                <PlayArrowIcon />
            </Button>
        }
    }, [playbackStatus])

    return (
        <Box sx={{
            textAlign: 'center'
        }}>
            <Box sx={{ margin: '2rem' }}>
                <Typography fontSize='1.5rem'>
                    Current status: {playbackStatus}
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
