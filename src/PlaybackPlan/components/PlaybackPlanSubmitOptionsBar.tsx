import {Box, Button, Container, Grid, ListItem, TextField, Typography} from "@mui/material";
import React from "react";
import styles from '../views/PlaybackPlan.module.css';

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
        <Container maxWidth={false}>
            <Grid container>
                <Grid item lg={2} md={6} xs={12}>
                    <TextField
                        className={styles.PlaybackPlanTextField}
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
                </Grid>
                <Grid item lg={2} md={6} xs={12}>
                    <TextField
                        className={styles.PlaybackPlanTextField}
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
                </Grid>
                <Grid item lg={2} md={6} xs={12}>
                    <TextField
                        className={styles.PlaybackPlanTextField}
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
            </Grid>
        </Container>
    )
}