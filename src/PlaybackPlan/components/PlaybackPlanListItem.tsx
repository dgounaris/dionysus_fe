import {Box, Container, Grid, ListItem, Typography} from "@mui/material";
import React from "react";
import {TrackSection, TrackSectionEquals} from "../models/TrackDetails";

export const PlaybackPlanListItem: React.FC<{
    trackName: string,
    allSections: TrackSection[],
    selectedSections: TrackSection[]
}> = ({
    trackName,
    allSections,
    selectedSections
}) => {
    const getSectionInterval = (trackSection: TrackSection) => {
        return `[${trackSection.start.toFixed(2)}-${trackSection.end.toFixed(2)}]`
    }

    const getSectionColor = (trackSection: TrackSection) => {
        if (selectedSections.find(it => TrackSectionEquals(it, trackSection)) !== undefined) {
            return '#B752AE'
        } else {
            return '#D6D6D6'
        }
    }

    return (
        <ListItem>
            <Container maxWidth={false}>
                <Grid container>
                    <Grid item xs={3}>
                        <Typography>{trackName}</Typography>
                    </Grid>
                    <Grid container spacing={1}>

                        {allSections.map(it =>
                            <Grid item>
                            <Typography color={getSectionColor(it)}>{getSectionInterval(it)}</Typography>
                            </Grid>
                        )}

                    </Grid>
                </Grid>
            </Container>
        </ListItem>
    )
}