import styles from './SongSelection.module.css';
import axios from "axios";
import {BACKEND_BASE_URL} from "../constants";
import {useEffect, useState} from "react";
import {Button, MenuItem, Select} from "@mui/material";
import { SelectChangeEvent } from '@mui/material/Select';
import { useNavigate  } from "react-router-dom";

const SongSelection = () => {
  const [myPlaylists, setMyPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState('');
  const jwtToken = localStorage.getItem("dionysus_jwt_token")

  const getMyPlaylists = async () => {
    const { data } = await axios.get(`${BACKEND_BASE_URL}/v1/playlists/me`, { headers: { "Authorization": `Bearer ${jwtToken}` } })
    return data
  }

  useEffect(() => {
      getMyPlaylists().then(data => {
        setMyPlaylists(data)
        setSelectedPlaylist(data[0])
      })
    }, [])

  const selectPlaylist = (event: SelectChangeEvent) => {
    setSelectedPlaylist(event.target.value);
  };

  let navigate = useNavigate()
  const submitPlaylist = () => {
    navigate("/playback/plan", { state: { playlistName: selectedPlaylist } }) // this might need to be a "finally"?
  }

  return (
    <div className={styles.SongSelection}>
      <header className={styles.SongSelectionHeader}>
        <p>
          Playlist selection for playback
        </p>
        <Select className={styles.SongSelectionPlaylistSelect} label="Select your playlist" value={selectedPlaylist} onChange={selectPlaylist}>
          {myPlaylists.map(value =>
            (
              <MenuItem key={value} value={value}>{value}</MenuItem>
            )
          )}
        </Select>
        <Button
          className={styles.SongSelectionButton} variant="contained" onClick={submitPlaylist}>Submit</Button>
      </header>
    </div>
  );
}

export default SongSelection;
