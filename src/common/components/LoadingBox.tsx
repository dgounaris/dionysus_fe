import React from "react";
import {Box, CircularProgress, Stack, Typography} from "@mui/material";

export const LoadingBox: React.FC<{
}> = ({
}) => {
    return (
        <Box display='flex' alignItems='center' justifyContent='center' style={{ minHeight: '80vh' }}>
            <Stack alignItems='center' justifyContent='center' spacing={2}>
                <CircularProgress />
                <Typography>Loading...</Typography>
            </Stack>
        </Box>
    )
}