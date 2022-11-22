import React from "react";
import {TrackDetails} from "../models/TrackDetails";
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
    isLoading: boolean,
    onListUpdateCallback: () => void
}> = ({
    playbackSelections,
    playbackTracks,
    isLoading,
    onListUpdateCallback
}) => {
    const onReorderButton = (operation: Operation, playbackSelections: TrackSelection[]) => (selectedIndex: number) => {
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
        onListUpdateCallback()
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
                {playbackSelections.map((value, index) =>
                    <PlaybackPlanListItem
                        trackName={value.name}
                        listIndex={index}
                        allSections={playbackTracks.find(it => it.id === value.id).sections}
                        selectedSections={value.sections}
                        onButtonUpClick = {onReorderButton(Operation.MOVE_UP, playbackSelections)}
                        onButtonDownClick = {onReorderButton(Operation.MOVE_DOWN, playbackSelections)}
                    />
                )}
            </List>
        </Grid>
    )
}