import React from "react";
import {Box, CircularProgress, Stack, Typography} from "@mui/material";

export const LoadingBox: React.FC<{
    textColor: string
}> = ({
    textColor
}) => {
    return (
        <Box display='flex' alignItems='center' justifyContent='center' style={{ minHeight: '80vh' }}>
            <Stack alignItems='center' justifyContent='center' spacing={2}>
                <CircularProgress />
                <Typography color={textColor}>Loading...</Typography>
            </Stack>
        </Box>
    )
}