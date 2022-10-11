import logo from '../logo.svg';
import './Login.css';

const Login = () => {
  return (
    <div className="Login">
      <header className="Login-header">
        <img src={logo} className="Login-logo" alt="logo" />
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
