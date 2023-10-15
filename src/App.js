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

  console.log(display)

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
        <span className={`active-bar ${
          display.type.name === 'SavedColors' ? 'menu-item-1'
          : display.type.name === 'ColorPicker' ? 'menu-item-2'
          : display.type.name ==='RandomScheme' ? 'menu-item-3'
          : 'menu-item-4'}`}>
        </span>
      </div>

      <div className='component-container'>
        {display}
      </div>
    </div>
  );
}

export default App;