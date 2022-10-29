import {MenuItem, Select} from "@mui/material";
import React from "react";
import {SelectChangeEvent} from "@mui/material/Select";
import {customTheme} from "../../common/themes/ThemeModuleAugmentation";

export const PlaylistList: React.FC<{
    selectedPlaylist: string,
    onChangeSelected: (event: SelectChangeEvent) => void,
    myPlaylists: string[]
}> = ({
  selectedPlaylist,
  onChangeSelected,
  myPlaylists
}) => {
    return (
        <Select sx={{
            backgroundColor: customTheme.palette.primary.main
        }} label="Select your playlist" value={selectedPlaylist} className="foo" onChange={onChangeSelected}>
            {myPlaylists?.map(value =>
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
    )
}