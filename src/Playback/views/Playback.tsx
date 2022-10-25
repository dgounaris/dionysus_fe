import React, {useEffect, useMemo, useState} from "react";
import {Box, Button, Grid, Typography} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import {PlaybackStartRequest} from "../models/PlaybackStartRequest";
import {backendClient} from "../../common/clients/http/BackendClient";
import {PlaybackState, PlaybackUpdateResponse} from "../models/PlaybackUpdateResponse";

const Playback = () => {
    const location = useLocation()
    const playbackDevice = location.state.playbackDevice
    const fadeDetails = location.state.fadeDetails

    const [playbackStatus, setPlaybackStatus] = useState<PlaybackState | null>(null);

    const startPlayback = async () => {
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
    }, [])

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
            return <Button variant="contained" onClick={pause}>Pause</Button>
        } else {
            return <Button variant="contained" onClick={resume}>Resume</Button>
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
                        {pauseResumeButton}
                    </Grid>
                    <Grid item lg={1} md={4} xs={12}>
                        <Button variant="contained" onClick={next}>Next</Button>
                    </Grid>
                    <Grid item lg={1} md={4} xs={12}>
                        <Button variant="contained" onClick={stop}>Stop</Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default Playback;
