import React from 'react';
import {SimpleButton} from "../../common/components/SimpleButton";
import {backendClient} from "../../common/clients/http/BackendClient";
import {Box, Typography} from "@mui/material";
import {LoginResponse} from "../models/LoginResponse";
import {useAuth} from "../../Auth/hooks/AuthHooks";
import {useNavigate} from "react-router-dom";

const Home: React.FC = () => {
    const { userLoggedIn } = useAuth()
    const navigate = useNavigate()

    const onLoginButtonClick = async () => {
        const response = await backendClient.get<LoginResponse>("/v1/login")
        window.location.href=response.loginUrl
    }
    const onSongSelectionButtonClick = () => {
        navigate("/selection")
    }
    const entrypointButtonName = userLoggedIn ? "Go to song selection" : "Login with Spotify"
    const entrypointButtonOnClick = userLoggedIn ? onSongSelectionButtonClick : onLoginButtonClick

    return (
        <Box sx={{
            textAlign: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center'
        }}>
                <Typography fontSize='1.8rem'>
                    Welcome to Dionysus
                </Typography>
                <Box sx={{ margin: '2rem' }}>
                    <SimpleButton text={entrypointButtonName} onClick={entrypointButtonOnClick} />
                </Box>
        </Box>
    );
}

export default Home;
