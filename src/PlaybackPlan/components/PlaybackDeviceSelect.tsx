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
        label="Select your playback device" size='small' value={selectedPlaybackDevice} onChange={onChangeSelected}>
            {playbackDevices.map(it => it.name).map(value =>
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
            )}
        </Select>
    )
}