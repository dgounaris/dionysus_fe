import React from 'react';
import './Home.css';
import {Button} from "@mui/material";
import {customTheme} from "../../common/themes/ThemeModuleAugmentation";

const Home: React.FC = () => {
    return (
        <div className="Home">
            <header className="Home-header">
                <p>
                    Welcome to Dionysus
                </p>
                <a
                    className="Home-link"
                    href="http://localhost:8888/v1/login"
                    rel="noopener noreferrer"
                >
                    Login with Spotify
                </a>
                <Button sx={{ backgroundColor: customTheme.custom.palette.primary.main }} variant="contained" />
            </header>
        </div>
    );
}

export default Home;
