import './App.css';
import React, { useState, useEffect } from 'react';
import ColorPicker from './Components/ColorPicker';
import ColorWheel from './Components/ColorWheel';
import RandomScheme from './Components/RandomScheme';
import SavedColors from './Components/SavedColors';
import {AiOutlineMenu} from 'react-icons/ai';
import {AiOutlineClose} from 'react-icons/ai';

function App() {
  const [savedColors, setSavedColors] = useState([]);
  const [display, setDisplay] = useState('SavedColors');
  const [menuVisible, setMenuVisible] = useState(false);
  const [saveColorData, setSaveColorData] = useState('');

  const onStorageUpdate = (e) => {
    const { key, newValue } = e;
    if (key === 'saveColorData') {
      setSaveColorData(newValue);
    }
  };

  useEffect(() => {
    setSaveColorData(localStorage.getItem('saveColorData') || '');
    if(localStorage.getItem('saveColorData').length > 0){
      setSavedColors(localStorage.getItem('saveColorData').split('*').map(i => i.split(',')))
    }    
    window.addEventListener('storage', onStorageUpdate);
    return () => {
      window.removeEventListener('storage', onStorageUpdate);
    };}, []);

  function switchComponent(comp){
    setDisplay(comp)
  }

  function toggleMenu(){
    setMenuVisible(!menuVisible)
  }

  const handleClick = (colorInput, multipleColors, deleteColor) =>{
    let add = []
    if(deleteColor === false){
      if(multipleColors === false){
        add.push(colorInput)
      }else{
        add = [...add, ...colorInput]
      }
      setSavedColors(savedColors.concat(add))
      setSaveColorData(savedColors.concat(add).join('*'))
      localStorage.setItem('saveColorData', savedColors.concat(add).join('*'));
    }else if(multipleColors === false){
      setSavedColors(savedColors.filter(i => i !== colorInput));
      setSaveColorData(savedColors.filter(i => i !== colorInput).join('*'))
      localStorage.setItem('saveColorData', savedColors.filter(i => i !== colorInput).join('*'));
    }else{
      setSavedColors([]);
      setSaveColorData('');
      localStorage.setItem('saveColorData', '');
    }
  }

  const menuBtns = <div className={`menu-btns-container ${menuVisible === true ? 'menu-btns-height fade-in' : 'fade-out'}`}>
  <button onClick={() => switchComponent('SavedColors')}
    className={`menu-btn-1 ${display === 'SavedColors' ? 'selected' : ''}`}>Saved Colors</button>
  <button onClick={() => switchComponent('ColorPicker')}
    className={`menu-btn-2 ${display === 'SavedColors' ? 'selected' : ''}`}>Color Picker</button>
  {/*<button onClick={() => switchComponent('RandomScheme')}
    className={`menu-btn-3 ${display === 'SavedColors' ? 'selected' : ''}`}>Color Schemes</button>*/}
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
            //: display ==='RandomScheme' ? {margin: '0 0 0 50%'}
            //: {margin: '0 0 0 75%'}
            : {margin: '0 0 0 50%'}
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