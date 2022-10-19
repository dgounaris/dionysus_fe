import styles from "../views/SongSelection.module.css";
import {MenuItem, Select} from "@mui/material";
import React from "react";
import {SelectChangeEvent} from "@mui/material/Select";

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
        <Select className={styles.SongSelectionPlaylistSelect} label="Select your playlist" value={selectedPlaylist} onChange={onChangeSelected}>
            {myPlaylists.map(value =>
                (
                    <MenuItem key={value} value={value}>{value}</MenuItem>
                )
            )}
        </Select>
    )
}