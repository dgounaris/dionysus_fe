import styles from './PlaybackPlan.module.css';
import axios from "axios";
import {BACKEND_BASE_URL} from "../../constants";
import {useEffect, useMemo, useState} from "react";
import {Box, Button, Grid, List, ListItem, ListItemText, MenuItem, Select, Typography} from "@mui/material";
import { SelectChangeEvent } from '@mui/material/Select';
import { useNavigate, useLocation } from "react-router-dom";
import {Playlist} from "../models/Playlist";
import {PreviewPlan, TrackSelection} from "../models/PreviewPlan";
import React from 'react';
import {SelectionOptions, Track} from "../models/PreviewPlanRequest";
import {PlaybackPlanOptionsBar} from "../components/PlaybackPlanOptionsBar";
import {PlaybackPlanList} from "../components/PlaybackPlanList";
import {AvailableDevice} from "../models/AvailableDevice";
import {PlaybackDeviceSelect} from "../components/PlaybackDeviceSelect";


const PlaybackPlan = () => {
    const location = useLocation()
    const playlistName = location.state.playlistName
    const jwtToken = localStorage.getItem("dionysus_jwt_token")

    const [previewPlan, setPreviewPlan] = useState<PreviewPlan>(null);
    const [selectionOptions, setSelectionOptions] = useState<SelectionOptions>(
        { minimumSelectionDuration: 75, maximumSelectionDuration: 100 }
    );
    const [loadingPreview, setLoadingPreview] = useState<boolean>(false)
    const [playbackDevices, setPlaybackDevices] = useState<AvailableDevice[]>([]);
    const [selectedPlaybackDevice, setSelectedPlaybackDevice] = useState('');
    const [refreshPreview, setRefreshPreview] = useState({});

    const getPlaylistTracks = async (): Promise<Playlist> => {
        const {data} = await axios.get(`${BACKEND_BASE_URL}/v1/playlists/tracks`,
            {headers: {'Authorization': `Bearer ${jwtToken}`}, params: {playlistName: playlistName}})
        return data
    }
    const postPreviewPlan = async (tracks: Track[]) : Promise<PreviewPlan> => {
        const previewPlanRequest = {
            tracks: tracks,
            selectionOptions: selectionOptions
        }
        const { data } = await axios.post(`${BACKEND_BASE_URL}/v1/plan/preview`,
            previewPlanRequest,
            { headers: { 'Authorization': `Bearer ${jwtToken}` } }
        )
        return data
    }

    const createPreviewPlan = async () => {
        const playlistTracksData = await getPlaylistTracks()
        const previewPlan = await postPreviewPlan(playlistTracksData.trackDetails.map(it => {
            const trackDto : Track = { id: it.id, name: it.name }
            return trackDto
        }))
        return previewPlan
    }
    useEffect(() => {
        setLoadingPreview(true)
        createPreviewPlan().then(data => {
            setPreviewPlan(data)
            setLoadingPreview(false)
        })
    }, [
        refreshPreview
    ])

    const getPlaybackDevices = async () => {
        const { data } = await axios.get(`${BACKEND_BASE_URL}/v1/playback/devices`,
            { headers: { 'Authorization': `Bearer ${jwtToken}` }})
        return data
    }
    useEffect(() => {
        getPlaybackDevices().then(data => {
            setPlaybackDevices(data)
            setSelectedPlaybackDevice(data[0].name ?? '')
        })
    }, [])

    const selectPlaybackDevice = (event: SelectChangeEvent) => {
        setSelectedPlaybackDevice(event.target.value);
    };

    const updateMinimumSelectionDuration = () => (newDuration: number) => {
        setSelectionOptions(
            {
                minimumSelectionDuration: newDuration,
                maximumSelectionDuration: selectionOptions.maximumSelectionDuration
            }
        )
    }
    const updateMaximumSelectionDuration = () => (newDuration: number) => {
        setSelectionOptions(
            {
                minimumSelectionDuration: selectionOptions.minimumSelectionDuration,
                maximumSelectionDuration: newDuration
            }
        )
    }
    const onRefreshPreviewClick = () => {
        setRefreshPreview({})
    }

    let navigate = useNavigate()
    const postSubmitPlan = async (trackSelections: TrackSelection[]) => {
        const { data } = await axios.post(`${BACKEND_BASE_URL}/v1/plan/submit`,
            {
                selections: trackSelections
            },
            { headers: { 'Authorization': `Bearer ${jwtToken}` } }
        )
    }
    const startPlayback = async () => {
        await postSubmitPlan(previewPlan.selections)
        navigate("/playback/active", { state: { playbackDetails: playbackDevices.find(it => it.name === selectedPlaybackDevice) } })
    }

    return (
        <div className={styles.PlaybackPlan}>
            <PlaybackPlanOptionsBar
                refreshEnabled={!loadingPreview}
                onMinimumDurationChange={updateMinimumSelectionDuration()}
                onMaximumDurationChange={updateMaximumSelectionDuration()}
                onReloadPreview={onRefreshPreviewClick}
            />
            <Grid item xs={12}>
                <Typography color="white">
                    The following tracks will be played in this order:
                </Typography>
            </Grid>
            <PlaybackPlanList playbackSelections={previewPlan.selections} playbackTracks={previewPlan.tracks} isLoading={loadingPreview} />
            <PlaybackDeviceSelect playbackDevices={playbackDevices} selectedPlaybackDevice={selectedPlaybackDevice} onChangeSelected={selectPlaybackDevice} />
            <Box>
                <Button className={styles.PlaybackPlanButton} variant="contained" onClick={startPlayback}>Play</Button>
            </Box>
        </div>
    );
}

export default PlaybackPlan;
