import styles from "./SongSelection.module.css";
import axios from "axios";
import {BACKEND_BASE_URL} from "../../constants";
import {useEffect, useState} from "react";
import { SelectChangeEvent } from '@mui/material/Select';
import { useNavigate } from "react-router-dom";
import React from 'react';
import {PlaylistList} from "../components/PlaylistList";
import {PlaylistSubmitButton} from "../components/PlaylistSubmitButton";

const SongSelection = () => {
    const [myPlaylists, setMyPlaylists] = useState([]);
    const [selectedPlaylist, setSelectedPlaylist] = useState('');
    const jwtToken = localStorage.getItem("dionysus_jwt_token")

    const getMyPlaylists = async () => {
        const { data } = await axios.get(`${BACKEND_BASE_URL}/v1/playlists/me`, { headers: { "Authorization": `Bearer ${jwtToken}` } })
        return data
    }

    const [myPlaylistsLoading, setMyPlaylistsLoading] = useState<boolean>(false);
    useEffect(() => {
        setMyPlaylistsLoading(true)
        getMyPlaylists().then(data => {
            setMyPlaylists(data)
            setSelectedPlaylist(data[0])
            setMyPlaylistsLoading(false)
        })
    }, [])

    const selectPlaylist = (event: SelectChangeEvent) => {
        setSelectedPlaylist(event.target.value);
    };

    let navigate = useNavigate()
    const submitPlaylist = () => {
        navigate("/playback/plan", { state: { playlistName: selectedPlaylist } })
    }

    return (
        <div className={styles.SongSelectionBody}>
            <p>
                Playlist selection for playback
            </p>
            <PlaylistList selectedPlaylist={selectedPlaylist} onChangeSelected={selectPlaylist} myPlaylists={myPlaylists} />
            <PlaylistSubmitButton onClick={submitPlaylist} disabled={myPlaylistsLoading} />
        </div>
    );
}

export default SongSelection;
