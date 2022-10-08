import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from './Login/Login';
import './App.css';
import SongSelection from "./SongSelection/SongSelection";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Login />}/>
        <Route exact path='/playback/selection' element={<SongSelection />}/>
      </Routes>
    </Router>
  );
}

export default App;
