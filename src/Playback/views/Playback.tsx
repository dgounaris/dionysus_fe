import styles from './Playback.module.css';
import {useEffect, useState} from "react";
import {Button} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import React from 'react';
import {PlaybackStartRequest} from "../models/PlaybackStartRequest";
import {backendClient} from "../../common/clients/http/BackendClient";

const Playback = () => {
    const location = useLocation()
    const playbackDevice = location.state.playbackDevice
    const fadeDetails = location.state.fadeDetails

    const [playbackStatus, setPlaybackStatus] = useState('');

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
        return backendClient.post<any, PlaybackStartRequest>(
            '/v1/playback/play/auto',
            null,
            body
        )
    }

    useEffect(() => {
        if (playbackStatus === '') {
            startPlayback().then(_ => {
                setPlaybackStatus('PLAYING')
            })
        }
    }, [])

    const pause = () => {
        backendClient.post<any, null>('/v1/playback/pause').then(_ => {
            setPlaybackStatus('PAUSED')
        })
    }
    const resume = () => {
        backendClient.post<any, null>('/v1/playback/resume').then(_ => {
            setPlaybackStatus('PLAYING')
        })
    }
    const next = () => {
        backendClient.post<any, null>('/v1/playback/next').then(_ => {
            setPlaybackStatus('PLAYING')
        })
    }
    const stop = () => {
        backendClient.post<any, null>('/v1/playback/stop').then(_ => {
            setPlaybackStatus('STOPPED')
        })
    }

    let navigate = useNavigate()

    let pauseResumeButton
    if (playbackStatus === 'PLAYING') {
        pauseResumeButton = <Button className={styles.PlaybackPlanButton} variant="contained" onClick={pause}>Pause</Button>
    } else {
        pauseResumeButton = <Button className={styles.PlaybackPlanButton} variant="contained" onClick={resume}>Resume</Button>
    }

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
