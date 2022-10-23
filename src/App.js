import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './Home/views/Home';
import './App.css';
import SongSelection from "./SongSelection/views/SongSelection";
import PlaybackPlan from "./PlaybackPlan/views/PlaybackPlan";
import Playback from "./Playback/views/Playback";
import LoginCallback from "./Auth/views/LoginCallback";
import {ProtectedRoute} from "./Auth/components/ProtectedRoute";
import {AuthProvider} from "./Auth/hooks/AuthHooks";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route exact path='/' element={<Home />}/>
          <Route exact path='/login/callback' element={
            <LoginCallback />
          }/>
          <Route exact path='/selection' element={
            <ProtectedRoute>
              <SongSelection />
            </ProtectedRoute>
          }/>
          <Route exact path='/playback/plan' element={
            <ProtectedRoute>
              <PlaybackPlan />
            </ProtectedRoute>
          }/>
          <Route exact path='/playback/active' element={
            <ProtectedRoute>
              <Playback />
            </ProtectedRoute>
          }/>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
