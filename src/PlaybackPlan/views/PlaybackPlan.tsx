import styles from './PlaybackPlan.module.css';
import axios from "axios";
import {BACKEND_BASE_URL} from "../../constants";
import {useEffect, useState} from "react";
import {Button, List, ListItem, ListItemText, MenuItem, Select} from "@mui/material";
import { SelectChangeEvent } from '@mui/material/Select';
import { useNavigate, useLocation } from "react-router-dom";
import {Playlist} from "../models/Playlist";
import {PreviewPlan, TrackSelection} from "../models/PreviewPlan";
import React from 'react';
import {PlaybackPlanListItem} from "../components/PlaybackPlanListItem";
import {TrackDetails} from "../models/TrackDetails";
import {SelectionOptions, Track} from "../models/PreviewPlanRequest";
import {PlaybackPlanOptionsBar} from "../components/PlaybackPlanOptionsBar";


const PlaybackPlan = () => {
    const location = useLocation()
    const playlistName = location.state.playlistName
    const jwtToken = localStorage.getItem("dionysus_jwt_token")

    const [playbackTracks, setPlaybackTracks] = useState<TrackDetails[]>([]);
    const [playbackSelections, setPlaybackSelections] = useState<TrackSelection[]>([]);
    const [selectionOptions, setSelectionOptions] = useState<SelectionOptions>(
        { minimumSelectionDuration: 75, maximumSelectionDuration: 100 }
    )
    const [loadingPreview, setLoadingPreview] = useState(false)
    const [myPlaybackDevices, setMyPlaybackDevices] = useState([]);
    const [selectedPlaybackDevice, setSelectedPlaybackDevice] = useState('');

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
    const postSubmitPlan = async (trackSelections: TrackSelection[]) => {
        const { data } = await axios.post(`${BACKEND_BASE_URL}/v1/plan/submit`,
            {
                selections: trackSelections
            },
            { headers: { 'Authorization': `Bearer ${jwtToken}` } }
        )
    }
    const getPlaybackDevices = async () => {
        const { data } = await axios.get(`${BACKEND_BASE_URL}/v1/playback/devices`,
            { headers: { 'Authorization': `Bearer ${jwtToken}` }})
        return data
    }

    const createPreviewPlan = async () => {
        setLoadingPreview(true)

        const playlistTracksData = await getPlaylistTracks()
        const previewPlan = await postPreviewPlan(playlistTracksData.trackDetails.map(it => {
            const trackDto : Track = { id: it.id, name: it.name }
            return trackDto
        }))

        setLoadingPreview(false)

        return previewPlan
    }

    useEffect(() => {
        createPreviewPlan().then(data => {
            setPlaybackTracks(data.tracks)
            setPlaybackSelections(data.selections)
        })
        getPlaybackDevices().then(data => {
            setMyPlaybackDevices(data)
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
        createPreviewPlan().then(data => {
            setPlaybackTracks(data.tracks)
            setPlaybackSelections(data.selections)
        })
    }

    let navigate = useNavigate()
    const startPlayback = async () => {
        await postSubmitPlan(playbackSelections)
        navigate("/playback/active", { state: { playbackDetails: myPlaybackDevices.find(it => it.name === selectedPlaybackDevice) } })
    }

    return (
        <div className={styles.PlaybackPlan}>
            <header className={styles.PlaybackPlanHeader}>
                <PlaybackPlanOptionsBar
                    refreshEnabled={!loadingPreview}
                    onMinimumDurationChange={updateMinimumSelectionDuration()}
                    onMaximumDurationChange={updateMaximumSelectionDuration()}
                    onReloadPreview={onRefreshPreviewClick}
                />
                <p>
                    The following tracks will be played in this order:
                </p>
                <List>
                    {playbackSelections.map(value =>
                        <PlaybackPlanListItem
                            trackName={value.name}
                            allSections={playbackTracks.find(it => it.id == value.id).sections}
                            selectedSections={value.sections}
                        />
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
