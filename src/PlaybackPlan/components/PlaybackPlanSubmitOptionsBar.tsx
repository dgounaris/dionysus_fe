import {Container, Grid, TextField} from "@mui/material";
import React from "react";

export const PlaybackPlanSubmitOptionsBar: React.FC<{
    onFadeMillisecondsChange: (number) => void,
    onVolumeChangeIntervalChange: (number) => void,
    onVolumeTotalReductionChange: (number) => void
}> = ({
    onFadeMillisecondsChange,
    onVolumeChangeIntervalChange,
    onVolumeTotalReductionChange
}) => {
    return (
        <Grid item lg={6} md={12} xs={12}>
            <TextField
                sx={{ backgroundColor: '#0F0F0F', margin: '1rem' }}
                id="fade-milliseconds"
                label="Total fade duration (milliseconds)"
                type="number"
                InputProps={{
                    style: { color: '#fff' }
                }}
                InputLabelProps={{
                    shrink: true,
                    style: { color: '#E0E0E0' }
                }}
                defaultValue='50'
                variant="filled"
                onChange={(e) => onFadeMillisecondsChange(Number(e.target.value))}
            />
            <TextField
                sx={{ backgroundColor: '#0F0F0F', margin: '1rem' }}
                id="volume-change-interval"
                label="Fade step interval (milliseconds)"
                type="number"
                InputProps={{
                    style: { color: '#fff' }
                }}
                InputLabelProps={{
                    shrink: true,
                    style: { color: '#E0E0E0' }
                }}
                defaultValue='10'
                variant="filled"
                onChange={(e) => onVolumeChangeIntervalChange(Number(e.target.value))}
            />
            <TextField
                sx={{ backgroundColor: '#0F0F0F', margin: '1rem' }}
                id="volume-total-reduction"
                label="Fade total reduction %"
                type="number"
                InputProps={{
                    style: { color: '#fff' }
                }}
                InputLabelProps={{
                    shrink: true,
                    style: { color: '#E0E0E0' }
                }}
                defaultValue='25'
                variant="filled"
                onChange={(e) => onVolumeTotalReductionChange(Number(e.target.value))}
            />
        </Grid>
    )
}