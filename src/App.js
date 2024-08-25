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
  const [display, setDisplay] = useState('Saved Colors');
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
    
    if(localStorage.getItem('saveColorData') !== null){
      if(localStorage.getItem('saveColorData').length > 0){
        setSavedColors(localStorage.getItem('saveColorData').split('*').map(i => i.split(',')))
      }
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

  const menuButtons = () => {
    let buttons = [];
    const components = ['Saved Colors', 'Color Picker', 'Color Wheel'];
    for(let i = 0; i < components.length; i++){
      buttons.push(<button key={i} onClick={() => switchComponent(components[i])}>{components[i]}
      </button>)
    }
    return (
      buttons
    )
  }

  return (
    <main className='app'>
      <div className='menu-container'>
        <div className='menu'>
          <div className={`menu-btns-container ${menuVisible ? 'menu-btns-height fade-in' : 'fade-out'}`}>
          {menuButtons()}
          </div>          
          <span className='active-bar' style={
            display === 'Saved Colors' ? {margin: '0'}
            : display === 'Color Picker' ? {margin: '0 0 0 25%'}
            : {margin: '0 0 0 50%'}
            }>
          </span>
        </div>
      </div>
      <div className='menu-mobile'>
        <button className='dropdown-menu-btn' onClickCapture={toggleMenu}>
          {!menuVisible ? <AiOutlineMenu className='icon'></AiOutlineMenu> : 
            <AiOutlineClose className='icon'></AiOutlineClose>}          
        </button>
        {menuButtons()}
      </div>

      <div className='component-container'>
        {display === 'Saved Colors' ? <SavedColors clickHandler={handleClick} data={savedColors} />
          : display === 'Color Picker' ? <ColorPicker clickHandler={handleClick} data={savedColors} />
          : <ColorWheel/>}
      </div>
    </main>
  );
}

export default App;