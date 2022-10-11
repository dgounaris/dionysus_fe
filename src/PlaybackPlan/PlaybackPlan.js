import styles from './PlaybackPlan.module.css';
import axios from "axios";
import {BACKEND_BASE_URL} from "../constants";
import {useEffect, useState} from "react";
import {Button, List, ListItem, ListItemText, MenuItem, Select} from "@mui/material";
import { SelectChangeEvent } from '@mui/material/Select';
import { useNavigate, useLocation } from "react-router-dom";


const PlaybackPlan = () => {
  const location = useLocation()
  const playlistName = location.state.playlistName
  const jwtToken = localStorage.getItem("dionysus_jwt_token")

  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [myPlaybackDevices, setMyPlaybackDevices] = useState([]);
  const [selectedPlaybackDevice, setSelectedPlaybackDevice] = useState('');

  const getPlaylistTracks = async () => {
    const { data } = await axios.get(`${BACKEND_BASE_URL}/v1/playlists/tracks`,
      { headers: { 'Authorization': `Bearer ${jwtToken}` }, params: { playlistName: playlistName }})
    return data
  }
  const getPlaybackDevices = async () => {
    const { data } = await axios.get(`${BACKEND_BASE_URL}/v1/playback/devices`,
      { headers: { 'Authorization': `Bearer ${jwtToken}` }})
    return data
  }

  useEffect(() => {
    getPlaylistTracks().then(data => {
        setPlaylistTracks(data.trackDetails)
      })
    getPlaybackDevices().then(data => {
        setMyPlaybackDevices(data)
        setSelectedPlaybackDevice(data[0].name ?? '')
      })
    }, [])

  const selectPlaybackDevice = (event: SelectChangeEvent) => {
    setSelectedPlaybackDevice(event.target.value);
  };

  let navigate = useNavigate()
  const startPlayback = () => {
    navigate("/playback/active", { state: { playlistName: playlistName, playbackDetails: myPlaybackDevices.find(it => it.name === selectedPlaybackDevice) } })
  }

  return (
    <div className={styles.PlaybackPlan}>
      <header className={styles.PlaybackPlanHeader}>
        <p>
          The following tracks will be played:
        </p>
        <List>
          {playlistTracks.map(value =>
            (<ListItemText primary={value.name} />)
          )}
        </List>
        <Select className={styles.PlaybackPlanSelect} label="Select your playback device" value={selectedPlaybackDevice} onChange={selectPlaybackDevice}>
          {myPlaybackDevices.map(value =>
            (
              <MenuItem key={value.name} value={value.name}>{value.name}</MenuItem>
            )
          )}
        </Select>
        <Button className={styles.PlaybackPlanButton} variant="contained" onClick={startPlayback}>Play</Button>
      </header>
    </div>
  );
}

export default PlaybackPlan;
