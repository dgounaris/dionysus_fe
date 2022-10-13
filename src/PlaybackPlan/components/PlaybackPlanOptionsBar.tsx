import {Box, Button, Container, Grid, ListItem, TextField, Typography} from "@mui/material";
import React from "react";
import styles from '../views/PlaybackPlan.module.css';

export const PlaybackPlanOptionsBar: React.FC<{
    refreshEnabled: boolean,
    onMinimumDurationChange: (number) => void,
    onMaximumDurationChange: (number) => void,
    onReloadPreview: () => void
}> = ({
    refreshEnabled,
    onMinimumDurationChange,
    onMaximumDurationChange,
    onReloadPreview
}) => {
    return (
        <Container maxWidth={false}>
            <Grid container>
                <Grid item lg={2}>
                    <TextField
                        className={styles.PlaybackPlanTextField}
                        id="minimum-duration"
                        label="Minimum duration"
                        type="number"
                        InputProps={{
                            style: { color: '#fff' }
                        }}
                        InputLabelProps={{
                            shrink: true,
                            style: { color: '#E0E0E0' }
                        }}
                        defaultValue='75'
                        variant="filled"
                        onChange={(e) => onMinimumDurationChange(Number(e.target.value))}
                    />
                </Grid>
                <Grid item lg={2}>
                    <TextField
                        className={styles.PlaybackPlanTextField}
                        id="maximum-duration"
                        label="Maximum duration"
                        type="number"
                        InputProps={{
                            style: { color: '#fff' }
                        }}
                        InputLabelProps={{
                            shrink: true,
                            style: { color: '#E0E0E0' }
                        }}
                        defaultValue='100'
                        variant="filled"
                        onChange={(e) => onMaximumDurationChange(Number(e.target.value))}
                    />
                </Grid>
                <Grid item xs={2}>
                    <Button className={styles.PlaybackPlanButton2} disabled={!refreshEnabled} variant="contained" onClick={onReloadPreview}>Refresh Preview</Button>
                </Grid>
            </Grid>
        </Container>
    )
}