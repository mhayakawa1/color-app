import './App.css';
import React, {useState} from 'react';
import ColorPicker from './Components/ColorPicker';
import ColorWheel from './Components/ColorWheel';
import RandomScheme from './Components/RandomScheme';
import SavedColors from './Components/SavedColors';
import {AiOutlineMenu} from 'react-icons/ai';
import {AiOutlineClose} from 'react-icons/ai';
{/*
get rid of localstorage, share state between components
*/}
function App() {
  const [savedColors, setSavedColors] = useState([]);
  const [display, setDisplay] = useState('SavedColors');
  const [menuVisible, setMenuVisible] = useState(false);

  function switchComponent(comp){
    setDisplay(comp)
  }

  function toggleMenu(){
    setMenuVisible(!menuVisible)
  }

  const handleClick = (newColors, multipleColors, clear) =>{
    let test = []
    //console.log(newColors)
    if(multipleColors === false){
      test.push(newColors)
    }else{
      test.push(newColors).flat(2)
    }
    setSavedColors(savedColors.concat(test))
  }

  const menuBtns = <div className={`menu-btns-container ${menuVisible === true ? 'menu-btns-height fade-in' : 'fade-out'}`}>
  <button onClick={() => switchComponent('SavedColors')}
    className={`menu-btn-1 ${display === 'SavedColors' ? 'selected' : ''}`}>Saved Colors</button>
  <button onClick={() => switchComponent('ColorPicker')}
    className={`menu-btn-2 ${display === 'SavedColors' ? 'selected' : ''}`}>Color Picker</button>
  <button onClick={() => switchComponent('RandomScheme')}
    className={`menu-btn-3 ${display === 'SavedColors' ? 'selected' : ''}`}>Color Schemes</button>
  <button onClick={() => switchComponent('ColorWheel')}
    className={`menu-btn-4 ${display === 'SavedColors' ? 'selected' : ''}`}>Color Wheel</button>
  </div>

  return (
    <div className='app'>
      <div className='menu-container'>
        <div className='menu'>
          {menuBtns}
          <span className='active-bar' style={
            display === 'SavedColors' ? {margin: '0'}
            : display === 'ColorPicker' ? {margin: '0 0 0 25%'}
            : display ==='RandomScheme' ? {margin: '0 0 0 50%'}
            : {margin: '0 0 0 75%'}
            }>
          </span>
        </div>
      </div>
      <div className='menu-mobile'>
        <button className='dropdown-menu-btn' onClickCapture={toggleMenu}>
          {menuVisible === false ? <AiOutlineMenu className='icon'></AiOutlineMenu> : 
            <AiOutlineClose className='icon'></AiOutlineClose>}          
        </button>
        {menuBtns}
      </div>

      <div className='component-container'>
        {display === 'SavedColors' ? <SavedColors clickHandler={handleClick} data={savedColors} />
          : display === 'ColorPicker' ? <ColorPicker clickHandler={handleClick} data={savedColors} />
          : display ==='RandomScheme' ? <RandomScheme clickHandler={handleClick} data={savedColors} />
          : <ColorWheel/>}
      </div>
    </div>
  );
}

export default App;