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

  useEffect(() => {
      startPlayback().then(data => {
        setPlaybackStatus('PLAYING')
      })
    }
  )

  let navigate = useNavigate()

  return (
    <div className={styles.PlaybackPlan}>
      <header className={styles.PlaybackPlanHeader}>
        <p>
          Current status: {playbackStatus}
        </p>
        <Button className={styles.PlaybackPlanButton} variant="contained">Pause</Button>
        <Button className={styles.PlaybackPlanButton} variant="contained">Next</Button>
        <Button className={styles.PlaybackPlanButton} variant="contained">Stop</Button>
      </header>
    </div>
  );
}

export default Playback;
