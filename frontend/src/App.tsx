import React from 'react';
import './styles/App.css';
import TrackSearch from './components/TrackSearch';

function App() {
  return (
    <div className="App">
      <header className="App-header">
       <div>Track Search</div>
      </header>
      <br/>
      <TrackSearch/>
    </div>
  );
}

export default App;
