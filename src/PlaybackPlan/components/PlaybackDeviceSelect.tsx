import {MenuItem, Select} from "@mui/material";
import React from "react";
import {AvailableDevice} from "../models/AvailableDevice";
import {SelectChangeEvent} from "@mui/material/Select";
import {customTheme} from "../../common/themes/ThemeModuleAugmentation";

export const PlaybackDeviceSelect: React.FC<{
    playbackDevices: AvailableDevice[],
    selectedPlaybackDevice: string,
    onChangeSelected: (event: SelectChangeEvent) => void
}> = ({
    playbackDevices,
    selectedPlaybackDevice,
    onChangeSelected
}) => {
    return (
        <Select sx={{
            backgroundColor: customTheme.palette.primary.main
        }}
        label="Select your playback device" value={selectedPlaybackDevice} onChange={onChangeSelected}>
            {playbackDevices.map(value =>
                (
                    <MenuItem key={value.name} value={value.name}>{value.name}</MenuItem>
                )
            )}
        </Select>
    )
}