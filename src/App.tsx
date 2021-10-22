import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import logo from './logo.svg';
import './App.css';
import Map from './Map';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function App() {
  return (
    <div className="App">
      <Map />
    </div>
  );
}

export default App;
