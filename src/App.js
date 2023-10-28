import './App.css';
import React, {useState} from 'react';
import ColorPicker from './Components/ColorPicker';
import ColorWheel from './Components/ColorWheel';
import RandomScheme from './Components/RandomScheme';
import SavedColors from './Components/SavedColors';

function App() {
  const [display, setDisplay] = useState('SavedColors');

  function switchComponent(comp){
    setDisplay(comp)
  }

  return (
    <div className='app'>
      <div className='menu-container'>
        <div className='menu'>
          <div>
            <button onClick={() => switchComponent('SavedColors')}
              className='menu-btn-1'>Saved Colors</button>
            <button onClick={() => switchComponent('ColorPicker')}
              className='menu-btn-2'>Color Picker</button>
            <button onClick={() => switchComponent('RandomScheme')}
              className='menu-btn-3'>Color Schemes</button>
            <button onClick={() => switchComponent('ColorWheel')}
              className='menu-btn-4'>Color Wheel</button>
          </div>
          <span className='active-bar' style={
            display === 'SavedColors' ? {margin: '0'}
            : display === 'ColorPicker' ? {margin: '0 0 0 25%'}
            : display ==='RandomScheme' ? {margin: '0 0 0 50%'}
            : {margin: '0 0 0 75%'}
          }>
        </span>

        </div>
      </div>

      <div className='component-container'>
        {display === 'SavedColors' ? <SavedColors />
          : display === 'ColorPicker' ? <ColorPicker />
          : display ==='RandomScheme' ? <RandomScheme/>
          : <ColorWheel/>}
      </div>
    </div>
  );
}

export default App;