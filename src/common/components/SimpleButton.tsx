import {customTheme} from "../themes/ThemeModuleAugmentation";
import {Button} from "@mui/material";
import React from "react";

export const SimpleButton: React.FC<{
    text: string,
    onClick: () => void
}> = ({
    text,
    onClick
}) => {
    return (
        <Button sx={{
            backgroundColor: customTheme.custom.palette.primary.main,
            "&:hover": {
                backgroundColor: "#8600bf"
            },
            "&:active": {
                backgroundColor: customTheme.custom.palette.primary.main
            }
        }} variant="contained" onClick={onClick}>
            {text}
        </Button>
    )
}