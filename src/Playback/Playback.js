import styles from './PlaybackPlan.module.css';
import axios from "axios";
import {BACKEND_BASE_URL} from "../constants";
import {useEffect, useState} from "react";
import {Button, List, ListItem, ListItemText, MenuItem, Select} from "@mui/material";
import { SelectChangeEvent } from '@mui/material/Select';
import { useNavigate, useLocation } from "react-router-dom";


const Playback = () => {
  const location = useLocation()
  const playbackDetails = location.state.playbackDetails
  const playlistName = location.state.playlistName

  const [playbackStatus, setPlaybackStatus] = useState('');

  const startPlayback = async () => {
    const { data } = await axios.post(`${BACKEND_BASE_URL}/v1/playback/play/auto`,
      {
        playbackDetails: {
          selectedDeviceId: playbackDetails.id,
          selectedDeviceType: playbackDetails.type,
          selectedDeviceVolumePercent: playbackDetails.volumePercent
        },
        playlistName: playlistName
      },
      {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }
    )
    return data
  }
  const pausePlayback = async () => {
    const { data } = await axios.post(`${BACKEND_BASE_URL}/v1/playback/pause`)
    return data
  }
  const resumePlayback = async () => {
    const { data } = await axios.post(`${BACKEND_BASE_URL}/v1/playback/resume`)
    return data
  }
  const nextPlayback = async () => {
    const { data } = await axios.post(`${BACKEND_BASE_URL}/v1/playback/next`)
    return data
  }
  const stopPlayback = async () => {
    const { data } = await axios.post(`${BACKEND_BASE_URL}/v1/playback/stop`)
    return data
  }

  useEffect(() => {
      startPlayback().then(_ => {
        setPlaybackStatus('PLAYING')
      })
    }
   , [])

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

  return (
    <div className={styles.PlaybackPlan}>
      <header className={styles.PlaybackPlanHeader}>
        <p>
          Current status: {playbackStatus}
        </p>
        <Button className={styles.PlaybackPlanButton} variant="contained" onClick={pause}>Pause</Button>
        <Button className={styles.PlaybackPlanButton} variant="contained" onClick={resume}>Resume</Button>
        <Button className={styles.PlaybackPlanButton} variant="contained" onClick={next}>Next</Button>
        <Button className={styles.PlaybackPlanButton} variant="contained" onClick={stop}>Stop</Button>
      </header>
    </div>
  );
}

export default Playback;
