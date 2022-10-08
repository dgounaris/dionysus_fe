import logo from '../logo.svg';
import './Login.css';

function Login() {
  return (
    <div className="Login">
      <header className="Login-header">
        <img src={logo} className="Login-logo" alt="logo" />
        <p>
          Welcome to Dionysus
        </p>
        <a
          className="Login-link"
          href="http://localhost:8888/login"
          target="_blank"
          rel="noopener noreferrer"
        >
          Login with Spotify
        </a>
      </header>
    </div>
  );
}

export default Login;
