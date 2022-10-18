import React from "react";
import {TrackDetails, TrackSection} from "../models/TrackDetails";
import {PlaybackPlanListItem} from "./PlaybackPlanListItem";
import {List} from "@mui/material";
import {TrackSelection} from "../models/PreviewPlan";

export const PlaybackPlanList: React.FC<{
    playbackSelections: TrackSelection[],
    playbackTracks: TrackDetails[]
}> = ({
    playbackSelections,
    playbackTracks
}) => {
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