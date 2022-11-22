import {Box, Button, Container, Grid, MenuItem, Select, TextField} from "@mui/material";
import React from "react";
import {customTheme} from "../../common/themes/ThemeModuleAugmentation";
import {OrderSelectionStrategy} from "../models/OrderSelectionStrategy";
import {SelectChangeEvent} from "@mui/material/Select";

export const PlaybackPlanOptionsBar: React.FC<{
    refreshEnabled: boolean,
    shuffleModes: OrderSelectionStrategy[],
    selectedShuffleMode: OrderSelectionStrategy,
    onShuffleModeChange: (event: SelectChangeEvent) => void,
    onMinimumDurationChange: (number) => void,
    onMaximumDurationChange: (number) => void,
    onReloadPreview: () => void
}> = ({
    refreshEnabled,
    shuffleModes,
    selectedShuffleMode,
    onShuffleModeChange,
    onMinimumDurationChange,
    onMaximumDurationChange,
    onReloadPreview
}) => {
    return (
        <Box sx={{ margin: '2rem' }}>
            <Container maxWidth={false}>
                <Grid container justifyContent='center'>
                    <Grid item lg={2} md={6} xs={12}>
                        <TextField
                            sx={{ backgroundColor: '#0F0F0F' }}
                            id="minimum-duration"
                            label="Minimum duration (per track)"
                            type="number"
                            InputProps={{
                                style: { color: '#fff' }
                            }}
                            InputLabelProps={{
                                shrink: true,
                                style: { color: '#E0E0E0' }
                            }}
                            defaultValue='60'
                            variant="filled"
                            onChange={(e) => onMinimumDurationChange(Number(e.target.value))}
                        />
                    </Grid>
                    <Grid item lg={2} md={6} xs={12}>
                        <TextField
                            sx={{ backgroundColor: '#0F0F0F' }}
                            id="maximum-duration"
                            label="Maximum duration (per track)"
                            type="number"
                            InputProps={{
                                style: { color: '#fff' }
                            }}
                            InputLabelProps={{
                                shrink: true,
                                style: { color: '#E0E0E0' }
                            }}
                            defaultValue='90'
                            variant="filled"
                            onChange={(e) => onMaximumDurationChange(Number(e.target.value))}
                        />
                    </Grid>
                    <Grid item lg={2} md={6} xs={12}>
                        <Select sx={{
                            backgroundColor: customTheme.palette.primary.main
                        }} label="Select shuffle mode" value={selectedShuffleMode} onChange={onShuffleModeChange}>
                            {shuffleModes?.map(value =>
                                (
                                    <MenuItem sx={{
                                        "&.MuiMenuItem-root": {
                                            color: customTheme.palette.getContrastText('#fff')
                                        },
                                        "&.Mui-selected": {
                                            backgroundColor: customTheme.palette.primary.dark,
                                            color: customTheme.palette.getContrastText(customTheme.palette.primary.dark)
                                        }
                                    }} key={value} value={value}>
                                        {value}
                                    </MenuItem>
                                )
                            ) ?? []}
                        </Select>
                    </Grid>
                </Grid>
                <Box sx={{ margin: '2rem' }}>
                    <Grid container justifyContent='center'>
                        <Grid item lg={2} md={6} xs={12}>
                            <Button disabled={!refreshEnabled} variant="contained" onClick={onReloadPreview}>Refresh Preview</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Box>
    )
}