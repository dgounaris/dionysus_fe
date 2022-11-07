import React from "react";
import {TrackDetails, TrackSection} from "../models/TrackDetails";
import {PlaybackPlanListItem} from "./PlaybackPlanListItem";
import {Grid, List} from "@mui/material";
import {TrackSelection} from "../models/PreviewPlan";
import {LoadingBox} from "../../common/components/LoadingBox";

export enum Operation {
    MOVE_UP,
    MOVE_DOWN
}

export const PlaybackPlanList: React.FC<{
    playbackSelections: TrackSelection[],
    playbackTracks: TrackDetails[],
    isLoading: boolean
}> = ({
    playbackSelections,
    playbackTracks,
    isLoading
}) => {
    const onReorderButton = (playbackSelections: TrackSelection[], selectedIndex: number, operation: Operation) => {
        if (operation === Operation.MOVE_UP && selectedIndex >= 1) {
            const temp = playbackSelections[selectedIndex]
            playbackSelections[selectedIndex] = playbackSelections[selectedIndex-1]
            playbackSelections[selectedIndex-1] = temp
        }
        else if (operation === Operation.MOVE_DOWN && selectedIndex < playbackSelections.length-1) {
            const temp = playbackSelections[selectedIndex]
            playbackSelections[selectedIndex] = playbackSelections[selectedIndex+1]
            playbackSelections[selectedIndex+1] = temp
        }
        // todo shuffle
        return playbackSelections
    }

    if (isLoading) {
        return (
            <Grid item xs={12}>
                <LoadingBox />
            </Grid>
        )
    }
    return (
        <Grid item xs={12}>
            <List>
                {playbackSelections.map(value =>
                    <PlaybackPlanListItem
                        trackName={value.name}
                        allSections={playbackTracks.find(it => it.id === value.id).sections}
                        selectedSections={value.sections}
                    />
                )}
            </List>
        </Grid>
    )
}