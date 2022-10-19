import styles from "../views/SongSelection.module.css";
import {Button} from "@mui/material";
import React from "react";

export const PlaylistSubmitButton: React.FC<{
    disabled: boolean,
    onClick: () => void
}> = ({
    disabled,
    onClick
}) => {
    return (
        <Button className={styles.SongSelectionButton} disabled={disabled} variant="contained" onClick={onClick}>
            Submit
        </Button>
    )
}