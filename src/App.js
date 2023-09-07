import './App.css';
import React, {useState} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

import ColorPicker from './Components/ColorPicker';
import ColorWheel from './Components/ColorWheel';
import RandomScheme from './Components/RandomScheme';
import SavedColors from './Components/SavedColors';
{/*Goals
  - When button is clicked, component shows
  - Home - save, edit and delete saved colors
  - Color Picker - use rgb color picker to find colors
  - Color Wheel - use color wheel to view different color schemes
  - Color Randomizer - pick and save random colors using 
    color scheme API http://colormind.io/api-access/

*/}
function App() {
  const [display, setDisplay] = useState(<SavedColors />);  
  const [savedColors, setSavedColors] = useState([]);

  function switchComponent(comp){
    setDisplay(comp)
  }

  return (
    <div className='App'>
      <div className='menu'>
        <button onClick={() => switchComponent(<SavedColors />)}>Saved Colors</button>
        <button onClick={() => switchComponent(<ColorPicker />)}>Color Picker</button>
        <button onClick={() => switchComponent(<RandomScheme />)}>Random Color Scheme</button>
        <button onClick={() => switchComponent(<ColorWheel />)}>Color Wheel</button>
      </div>

      <div className='component-container'>
        {display}
      </div>
    </div>
  );
}

export default App;
