import {useEffect, useState} from "react";
import { SelectChangeEvent } from '@mui/material/Select';
import { useNavigate } from "react-router-dom";
import React from 'react';
import {PlaylistList} from "../components/PlaylistList";
import {PlaylistSubmitButton} from "../components/PlaylistSubmitButton";
import {backendClient} from "../../common/clients/http/BackendClient";
import {Box, Typography} from "@mui/material";

const SongSelection = () => {
    const [myPlaylists, setMyPlaylists] = useState([]);
    const [selectedPlaylist, setSelectedPlaylist] = useState('');

    const [myPlaylistsLoading, setMyPlaylistsLoading] = useState<boolean>(false);
    useEffect(() => {
        setMyPlaylistsLoading(true)
        backendClient.get<string[]>('/v1/playlists/me').then(data => {
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
        <Box sx={{
            textAlign: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center'
        }}>
            <Typography fontSize='1.8rem'>
                Playlist selection for playback
            </Typography>
            <Box margin='2rem'>
                <PlaylistList selectedPlaylist={selectedPlaylist} onChangeSelected={selectPlaylist} myPlaylists={myPlaylists} />
            </Box>
            <PlaylistSubmitButton onClick={submitPlaylist} disabled={myPlaylistsLoading} />
        </Box>
    );
}

export default SongSelection;
