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
        <Button disabled={disabled} variant="contained" onClick={onClick}>
            Submit
        </Button>
    )
}