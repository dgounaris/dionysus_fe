import React from "react";
import {TrackDetails, TrackSection} from "../models/TrackDetails";
import {PlaybackPlanListItem} from "./PlaybackPlanListItem";
import {List} from "@mui/material";
import {PreviewPlan, TrackSelection} from "../models/PreviewPlan";
import {AsyncState} from "react-use/lib/useAsyncFn";

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
        return <div />
    }
    return (
        <List>
            {playbackSelections.map(value =>
                <PlaybackPlanListItem
                    trackName={value.name}
                    allSections={playbackTracks.find(it => it.id == value.id).sections}
                    selectedSections={value.sections}
                />
            )}
        </List>
    )
}