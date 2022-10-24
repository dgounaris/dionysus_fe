import React from 'react';
import {SimpleButton} from "../../common/components/SimpleButton";
import {backendClient} from "../../common/clients/http/BackendClient";
import {Box, Link, Typography} from "@mui/material";

const Home: React.FC = () => {
    const onLoginButtonClick = async () => {
        await backendClient.get<any>("/v1/login")
    }

    return (
        <Box sx={{
            textAlign: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
        }}>
                <Typography fontSize='2rem'>
                    Welcome to Dionysus
                </Typography>
                <Link
                    href="http://localhost:8888/v1/login"
                    rel="noopener noreferrer"
                >
                    Login with Spotify
                </Link>
                <SimpleButton text="Login with Spotify" onClick={onLoginButtonClick} />
        </Box>
    );
}

export default Home;
