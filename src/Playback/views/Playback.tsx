import styles from './Playback.module.css';
import axios from "axios";
import {BACKEND_BASE_URL} from "../../constants";
import {useEffect, useState} from "react";
import {Button, List, ListItem, ListItemText, MenuItem, Select} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import React from 'react';
import {PlaybackStartRequest} from "../models/PlaybackStartRequest";

const Playback = () => {
    const location = useLocation()
    const playbackDetails = location.state.playbackDetails
    const jwtToken = localStorage.getItem("dionysus_jwt_token")

    const [playbackStatus, setPlaybackStatus] = useState('');

    const startPlayback = async () => {
        const body: PlaybackStartRequest = {
            playbackDetails: {
                selectedDeviceId: playbackDetails.id,
                selectedDeviceType: playbackDetails.type,
                selectedDeviceVolumePercent: playbackDetails.volumePercent
            }
        }
        const { data } = await axios.post(`${BACKEND_BASE_URL}/v1/playback/play/auto`,
            body,
            {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': `Bearer ${jwtToken}`
                }
            }
        )
        return data
    }
    const pausePlayback = async () => {
        const { data } = await axios.post(`${BACKEND_BASE_URL}/v1/playback/pause`,
            {},
            { headers: { 'Authorization': `Bearer ${jwtToken}` } })
        return data
    }
    const resumePlayback = async () => {
        const { data } = await axios.post(`${BACKEND_BASE_URL}/v1/playback/resume`,
            {},
            { headers: { 'Authorization': `Bearer ${jwtToken}` } })
        return data
    }
    const nextPlayback = async () => {
        const { data } = await axios.post(`${BACKEND_BASE_URL}/v1/playback/next`,
            {},
            { headers: { 'Authorization': `Bearer ${jwtToken}` } })
        return data
    }
    const stopPlayback = async () => {
        const { data } = await axios.post(`${BACKEND_BASE_URL}/v1/playback/stop`,
            {},
            { headers: { 'Authorization': `Bearer ${jwtToken}` } })
        return data
    }

    useEffect(() => {
        if (playbackStatus === '') {
            startPlayback().then(_ => {
                setPlaybackStatus('PLAYING')
            })
        }
    }, [])

    const pause = () => {
        pausePlayback().then(_ => {
            setPlaybackStatus('PAUSED')
        })
    }
    const resume = () => {
        resumePlayback().then(_ => {
            setPlaybackStatus('PLAYING')
        })
    }
    const next = () => {
        nextPlayback().then(_ => {
            setPlaybackStatus('PLAYING')
        })
    }
    const stop = () => {
        stopPlayback().then(data => {
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
