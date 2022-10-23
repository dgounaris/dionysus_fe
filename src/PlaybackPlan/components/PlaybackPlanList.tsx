import React from "react";
import {TrackDetails, TrackSection} from "../models/TrackDetails";
import {PlaybackPlanListItem} from "./PlaybackPlanListItem";
import {Grid, List} from "@mui/material";
import {PreviewPlan, TrackSelection} from "../models/PreviewPlan";
import {AsyncState} from "react-use/lib/useAsyncFn";
import {LoadingBox} from "../../common/components/LoadingBox";

export const PlaybackPlanList: React.FC<{
    playbackSelections: TrackSelection[],
    playbackTracks: TrackDetails[],
    isLoading: boolean
}> = ({
    playbackSelections,
    playbackTracks,
    isLoading
}) => {
    if (isLoading) {
        return (
            <Grid item xs={12}>
                <LoadingBox textColor="white" />
            </Grid>
        )
    }
    return (
        <Grid item xs={12}>
            <List>
                {playbackSelections.map(value =>
                    <PlaybackPlanListItem
                        trackName={value.name}
                        allSections={playbackTracks.find(it => it.id == value.id).sections}
                        selectedSections={value.sections}
                    />
                )}
            </List>
        </Grid>
    )
}