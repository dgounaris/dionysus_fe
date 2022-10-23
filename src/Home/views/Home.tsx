import React from 'react';
import './Home.css';
import {SimpleButton} from "../../common/components/SimpleButton";
import {backendClient} from "../../common/clients/http/BackendClient";

const Home: React.FC = () => {
    const onLoginButtonClick = async () => {
        await backendClient.get<any>("/v1/login")
    }

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
                <SimpleButton text="Login with Spotify" onClick={onLoginButtonClick} />
            </header>
        </div>
    );
}

export default Home;
