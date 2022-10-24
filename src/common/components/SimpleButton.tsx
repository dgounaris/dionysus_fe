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
        <Button variant="contained" onClick={onClick}>
            {text}
        </Button>
    )
}