import logo from '../logo.svg';
import './SongSelection.css';

function SongSelection() {
  return (
    <div className="SongSelection">
      <header className="SongSelection-header">
        <img src={logo} className="SongSelection-logo" alt="logo" />
        <p>
          Song selection for playback
        </p>
      </header>
    </div>
  );
}

export default SongSelection;
