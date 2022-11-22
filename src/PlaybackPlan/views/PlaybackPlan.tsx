import React, {useEffect, useState} from "react";
import {Box, Button, Grid, Typography} from "@mui/material";
import {SelectChangeEvent} from '@mui/material/Select';
import {useLocation, useNavigate} from "react-router-dom";
import {Playlist} from "../models/Playlist";
import {PreviewPlan} from "../models/PreviewPlan";
import {PreviewPlanRequest, SelectionOptions} from "../models/PreviewPlanRequest";
import {PlaybackPlanOptionsBar} from "../components/PlaybackPlanOptionsBar";
import {PlaybackPlanList} from "../components/PlaybackPlanList";
import {AvailableDevice} from "../models/AvailableDevice";
import {PlaybackDeviceSelect} from "../components/PlaybackDeviceSelect";
import {backendClient} from "../../common/clients/http/BackendClient";
import {SubmitPlanRequest} from "../models/SubmitPlanRequest";
import {FadeDetails} from "../models/FadeDetails";
import {PlaybackPlanSubmitOptionsBar} from "../components/PlaybackPlanSubmitOptionsBar";
import {customTheme} from "../../common/themes/ThemeModuleAugmentation";
import {PlaybackStartRequest} from "../../Playback/models/PlaybackStartRequest";
import {PlaybackUpdateResponse} from "../../Playback/models/PlaybackUpdateResponse";
import {OrderSelectionStrategy} from "../models/OrderSelectionStrategy";


const PlaybackPlan = () => {
    const location = useLocation()
    const playlistName = location.state.playlistName

    const [previewPlan, setPreviewPlan] = useState<PreviewPlan | null>(null);
    const [selectionOptions, setSelectionOptions] = useState<SelectionOptions>(
        { minimumSelectionDuration: 60, maximumSelectionDuration: 90, orderSelectionStrategy: OrderSelectionStrategy.DEFAULT }
    );
    const [fadeDetails, setFadeDetails] = useState<FadeDetails>(
        { fadeMilliseconds: 50, volumeChangeIntervalMilliseconds: 10, volumeTotalReduction: 25 }
    );
    const [loadingPreview, setLoadingPreview] = useState<boolean>(false)
    const [playbackDevices, setPlaybackDevices] = useState<AvailableDevice[]>([]);
    const [selectedPlaybackDevice, setSelectedPlaybackDevice] = useState<string>('');
    const [refreshPreview, setRefreshPreview] = useState({});
    const [refreshPreviewView, setRefreshPreviewView] = useState({});

    const createPreviewPlan = async () => {
        const playlistTracksData = await backendClient.get<Playlist>(
            '/v1/playlists/tracks', {playlistName: playlistName}
        )
        if (!playlistTracksData) {
            return null
        }
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
            if (data !== null) {
                setPreviewPlan(data)
                setLoadingPreview(false)
            }
        })
    }, [
        refreshPreview
    ])

    useEffect(() => {
        backendClient.get<AvailableDevice[]>('/v1/playback/devices').then(data => {
            if (!data) {
                setPlaybackDevices([])
                setSelectedPlaybackDevice('')
            } else {
                setPlaybackDevices(data)
                setSelectedPlaybackDevice(data[0].name ?? '')
            }
        })
    }, [])

    const selectPlaybackDevice = (event: SelectChangeEvent) => {
        setSelectedPlaybackDevice(event.target.value);
    };

    const selectOrderSelectionStrategy = (event: SelectChangeEvent) => {
        setSelectionOptions(
            {
                ...selectionOptions,
                orderSelectionStrategy: OrderSelectionStrategy[event.target.value]
            }
        )
    }
    const updateMinimumSelectionDuration = (newDuration: number) => {
        setSelectionOptions(
            {
                ...selectionOptions,
                minimumSelectionDuration: newDuration,
                maximumSelectionDuration: selectionOptions.maximumSelectionDuration
            }
        )
    }
    const updateMaximumSelectionDuration = (newDuration: number) => {
        setSelectionOptions(
            {
                ...selectionOptions,
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
        const body: PlaybackStartRequest = {
            playbackDetails: {
                selectedDeviceId: device.id,
                selectedDeviceType: device.type,
                selectedDeviceVolumePercent: device.volumePercent,
                fadeDetails: {
                    fadeMilliseconds: fadeDetails.fadeMilliseconds,
                    volumeChangeIntervalMilliseconds: fadeDetails.volumeChangeIntervalMilliseconds,
                    volumeTotalReduction: fadeDetails.volumeTotalReduction
                }
            }
        }
        await backendClient.post<PlaybackUpdateResponse, PlaybackStartRequest>(
            '/v1/playback/play/auto',
            null,
            body
        )
        navigate("/playback/active")
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
                        <Typography variant='h5'>
                            Playback Preview
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
            <PlaybackPlanOptionsBar
                refreshEnabled={!loadingPreview}
                shuffleModes={Object.values(OrderSelectionStrategy)}
                selectedShuffleMode={selectionOptions.orderSelectionStrategy}
                onShuffleModeChange={selectOrderSelectionStrategy}
                onMinimumDurationChange={updateMinimumSelectionDuration}
                onMaximumDurationChange={updateMaximumSelectionDuration}
                onReloadPreview={onRefreshPreviewClick}
            />
            <Grid item xs={12}>
                <Typography variant='h6'>
                    The following tracks will be played in this order:
                </Typography>
            </Grid>
            <PlaybackPlanList
                playbackSelections={previewPlan?.selections ?? []}
                playbackTracks={previewPlan?.tracks ?? []}
                isLoading={loadingPreview}
                onListUpdateCallback={() => setRefreshPreviewView({})} />
            <Box position='sticky' bottom={0} sx={{
                background: `linear-gradient(to bottom, #21182566, ${customTheme.palette.background.default})`,
                paddingTop: '2rem',
                paddingBottom: '1rem'
            }}>
                <Grid container>
                    <PlaybackPlanSubmitOptionsBar
                        onFadeMillisecondsChange={onFadeMillisecondsChange}
                        onVolumeChangeIntervalChange={onVolumeChangeIntervalChange}
                        onVolumeTotalReductionChange={onVolumeTotalReductionChange}
                    />
                    <Grid item lg={2} md={12} xs={12} justifyContent='left'>
                        <Box sx={{ margin: '1rem' }}>
                            <PlaybackDeviceSelect playbackDevices={playbackDevices} selectedPlaybackDevice={selectedPlaybackDevice} onChangeSelected={selectPlaybackDevice} />
                        </Box>
                    </Grid>
                    <Grid item lg={2} md={12} xs={12}>
                        <Box sx={{ margin: '1rem' }}>
                            <Button variant="contained" size='large' onClick={startPlayback} disabled={loadingPreview}>Play</Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default PlaybackPlan;
