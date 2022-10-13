import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from './Login/views/Login';
import './App.css';
import SongSelection from "./SongSelection/views/SongSelection";
import PlaybackPlan from "./PlaybackPlan/views/PlaybackPlan";
import Playback from "./Playback/views/Playback";
import LoginCallback from "./Auth/views/LoginCallback";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Login />}/>
        <Route exact path='/login/callback' element={<LoginCallback />}/>
        <Route exact path='/selection' element={<SongSelection />}/>
        <Route exact path='/playback/plan' element={<PlaybackPlan />}/>
        <Route exact path='/playback/active' element={<Playback />}/>
      </Routes>
    </Router>
  );
}

export default App;
