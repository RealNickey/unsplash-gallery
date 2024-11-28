import React from 'react';
import './App.css';

// Dynamically import all images from the assets folder
const importAll = (r) => r.keys().map(r);
const images = importAll(require.context('./assets', false, /\.(png|jpe?g|svg)$/));

function App() {
  return (
    <div className="App">
      {images.map((image, index) => (
        <img key={index} src={image} className="App-logo" alt={`logo-${index}`} />
      ))}
    </div>
  );
}

export default App;