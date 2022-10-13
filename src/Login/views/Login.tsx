import React from 'react';
import './Login.css';

const Login: React.FC = () => {
    return (
        <div className="Login">
            <header className="Login-header">
                <p>
                    Welcome to Dionysus
                </p>
                <a
                    className="Login-link"
                    href="http://localhost:8888/v1/login"
                    rel="noopener noreferrer"
                >
                    Login with Spotify
                </a>
            </header>
        </div>
    );
}

export default Login;
