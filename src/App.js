import './App.css';
import React, {useState} from 'react';
import ColorPicker from './Components/ColorPicker';
import ColorWheel from './Components/ColorWheel';
import RandomScheme from './Components/RandomScheme';
import SavedColors from './Components/SavedColors';

function App() {
  const [display, setDisplay] = useState(<SavedColors />);

  function switchComponent(comp){
    setDisplay(comp)
  }

  return (
    <div className='app'>
      <div className='menu'> 
        <span className='filler'></span>
        <div>
          <button onClick={() => switchComponent(<SavedColors />)}>Saved Colors</button>
          <button onClick={() => switchComponent(<ColorPicker />)}>Color Picker</button>
          <button onClick={() => switchComponent(<RandomScheme />)}>Color Schemes</button>
          <button onClick={() => switchComponent(<ColorWheel />)}>Color Wheel</button>
        </div>
        <span className='active-bar' style={
          display.type.name === 'SavedColors' ? {margin: '0'}
          : display.type.name === 'ColorPicker' ? {margin: '0 0 0 8rem'}
          : display.type.name ==='RandomScheme' ? {margin: '0 0 0 16rem'}
          : {margin: '0 0 0 24rem'}
        }>
        </span>
      </div>

      <div className='component-container'>
        {display}
      </div>
    </div>
  );
}

export default App;