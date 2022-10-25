import {useEffect, useState} from "react";
import {Box, Button, Grid, Typography} from "@mui/material";
import { SelectChangeEvent } from '@mui/material/Select';
import { useNavigate, useLocation } from "react-router-dom";
import {Playlist} from "../models/Playlist";
import {PreviewPlan} from "../models/PreviewPlan";
import React from 'react';
import {PreviewPlanRequest, SelectionOptions} from "../models/PreviewPlanRequest";
import {PlaybackPlanOptionsBar} from "../components/PlaybackPlanOptionsBar";
import {PlaybackPlanList} from "../components/PlaybackPlanList";
import {AvailableDevice} from "../models/AvailableDevice";
import {PlaybackDeviceSelect} from "../components/PlaybackDeviceSelect";
import {backendClient} from "../../common/clients/http/BackendClient";
import {SubmitPlanRequest} from "../models/SubmitPlanRequest";
import {FadeDetails} from "../models/FadeDetails";
import {PlaybackPlanSubmitOptionsBar} from "../components/PlaybackPlanSubmitOptionsBar";


const PlaybackPlan = () => {
    const location = useLocation()
    const playlistName = location.state.playlistName

    const [previewPlan, setPreviewPlan] = useState<PreviewPlan | null>(null);
    const [selectionOptions, setSelectionOptions] = useState<SelectionOptions>(
        { minimumSelectionDuration: 60, maximumSelectionDuration: 90 }
    );
    const [fadeDetails, setFadeDetails] = useState<FadeDetails>(
        { fadeMilliseconds: 50, volumeChangeIntervalMilliseconds: 10, volumeTotalReduction: 25 }
    );
    const [loadingPreview, setLoadingPreview] = useState<boolean>(false)
    const [playbackDevices, setPlaybackDevices] = useState<AvailableDevice[]>([]);
    const [selectedPlaybackDevice, setSelectedPlaybackDevice] = useState<string>('');
    const [refreshPreview, setRefreshPreview] = useState({});

    const createPreviewPlan = async () => {
        const playlistTracksData = await backendClient.get<Playlist>(
            '/v1/playlists/tracks', {playlistName: playlistName}
        )
        return await backendClient.post<PreviewPlan, PreviewPlanRequest>(
            '/v1/plan/preview',
            null,
            {
                tracks: playlistTracksData.trackDetails.map(trackDetailSet => {
                    return { id: trackDetailSet.id, name: trackDetailSet.name }
                }),
                selectionOptions: selectionOptions
            }
        )
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

    useEffect(() => {
        backendClient.get<AvailableDevice[]>('/v1/playback/devices').then(data => {
            setPlaybackDevices(data)
            setSelectedPlaybackDevice(data[0].name ?? '')
        })
    }, [])

    const selectPlaybackDevice = (event: SelectChangeEvent) => {
        setSelectedPlaybackDevice(event.target.value);
    };

    const updateMinimumSelectionDuration = (newDuration: number) => {
        setSelectionOptions(
            {
                minimumSelectionDuration: newDuration,
                maximumSelectionDuration: selectionOptions.maximumSelectionDuration
            }
        )
    }
    const updateMaximumSelectionDuration = (newDuration: number) => {
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

    const onFadeMillisecondsChange = (newFadeMilliseconds: number) => {
        setFadeDetails(
            {
                ...fadeDetails, fadeMilliseconds: newFadeMilliseconds
            }
        )
    }
    const onVolumeChangeIntervalChange = (newVolumeChangeInterval: number) => {
        setFadeDetails(
            {
                ...fadeDetails, volumeChangeIntervalMilliseconds: newVolumeChangeInterval
            }
        )
    }
    const onVolumeTotalReductionChange = (newVolumeTotalReduction: number) => {
        setFadeDetails(
            {
                ...fadeDetails, volumeTotalReduction: newVolumeTotalReduction
            }
        )
    }

    let navigate = useNavigate()
    const startPlayback = async () => {
        await backendClient.post<any, SubmitPlanRequest>(
            '/v1/plan/submit',
            null,
            { selections: previewPlan.selections }
        )
        const device = playbackDevices.find(it => it.name === selectedPlaybackDevice);
        navigate("/playback/active", { state: {
            playbackDevice: device,
            fadeDetails: fadeDetails
        } })
    }

    return (
        <Box sx={{
            textAlign: 'center'
        }}>
            <Box sx={{
                margin: '2rem'
            }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography fontSize='1.2rem'>
                            Playback Preview
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
            <PlaybackPlanOptionsBar
                refreshEnabled={!loadingPreview}
                onMinimumDurationChange={updateMinimumSelectionDuration}
                onMaximumDurationChange={updateMaximumSelectionDuration}
                onReloadPreview={onRefreshPreviewClick}
            />
            <Grid item xs={12}>
                <Typography fontSize='1rem'>
                    The following tracks will be played in this order:
                </Typography>
            </Grid>
            <PlaybackPlanList playbackSelections={previewPlan?.selections ?? []} playbackTracks={previewPlan?.tracks ?? []} isLoading={loadingPreview} />
            <Box sx={{ margin: '2rem' }}>
                <PlaybackDeviceSelect playbackDevices={playbackDevices} selectedPlaybackDevice={selectedPlaybackDevice} onChangeSelected={selectPlaybackDevice} />
            </Box>
            <PlaybackPlanSubmitOptionsBar
                onFadeMillisecondsChange={onFadeMillisecondsChange}
                onVolumeChangeIntervalChange={onVolumeChangeIntervalChange}
                onVolumeTotalReductionChange={onVolumeTotalReductionChange}
            />
            <Box sx={{ margin: '2rem' }}>
                <Button variant="contained" onClick={startPlayback} disabled={loadingPreview}>Play</Button>
            </Box>
        </Box>
    );
}

export default PlaybackPlan;
