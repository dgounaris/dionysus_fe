import styles from './Playback.module.css';
import React, {useEffect, useMemo, useState} from "react";
import {Button} from "@mui/material";
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
            return <Button className={styles.PlaybackPlanButton} variant="contained" onClick={pause}>Pause</Button>
        } else {
            return <Button className={styles.PlaybackPlanButton} variant="contained" onClick={resume}>Resume</Button>
        }
    }, [playbackStatus])

    return (
        <div className={styles.PlaybackPlan}>
            <header className={styles.PlaybackPlanHeader}>
                <p>
                    Current status: {playbackStatus}
                </p>
                <div>
                    {pauseResumeButton}
                    <Button className={styles.PlaybackPlanButton} variant="contained" onClick={next}>Next</Button>
                    <Button className={styles.PlaybackPlanButton} variant="contained" onClick={stop}>Stop</Button>
                </div>
            </header>
        </div>
    );
}

export default Playback;
