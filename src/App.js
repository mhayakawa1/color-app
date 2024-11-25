import './App.css';
import React, { useState, useEffect } from 'react';
import ColorPicker from './Components/ColorPicker';
import ColorWheel from './Components/ColorWheel';
import SavedColors from './Components/SavedColors';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

const MenuButton = ({switchComponent, component}) => {
  return (
    <button className='menu-button' onClick={() => switchComponent(component)}>{component}</button>
  )
}

function App() {
  const [savedColors, setSavedColors] = useState([]);
  const [display, setDisplay] = useState('Saved Colors');
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [saveColorData, setSaveColorData] = useState('');

  const onStorageUpdate = (e) => {
    const { key, newValue } = e;
    if (key === 'saveColorData') {
      setSaveColorData(newValue);
    }
  };

  useEffect(() => {
    setSaveColorData(localStorage.getItem('saveColorData') || '');

    if (localStorage.getItem('saveColorData') !== null) {
      if (localStorage.getItem('saveColorData').length > 0) {
        setSavedColors(JSON.parse(localStorage.getItem('saveColorData')));
      }
    }
    window.addEventListener('storage', onStorageUpdate);
    return () => {
      window.removeEventListener('storage', onStorageUpdate);
    };
  }, []);

  function switchComponent(comp) {
    setDisplay(comp)
  }

  function toggleMenu() {
    setIsMenuVisible(!isMenuVisible)
  }

  const save = (colors) => {
    setSavedColors(colors);
    setSaveColorData(colors.join(' '));
    localStorage.setItem('saveColorData', JSON.stringify(colors));
  }

  const handleClick = (colorInput, multipleColors, deleteColor) => {
    let add = [];
    const includesNewColor = savedColors.filter((i) => i !== colorInput).length === 0;
    if (!deleteColor && includesNewColor) {
      if (!multipleColors) {
        add.push(colorInput);
      } else {
        add = [...add, ...colorInput];
      }
      save(savedColors.concat(add));
    } else if(deleteColor){
      save([]);
    }
  }

  const renderMenuButtons = () => {
    let buttons = [];
    const components = ['Saved Colors', 'Color Picker', 'Color Wheel'];
    for (let i = 0; i < components.length; i++) {
      buttons.push(
        <MenuButton key={i} switchComponent={switchComponent} component={components[i]} />
      )
    }
    return (
      buttons
    )
  }

  return (
    <main className='app'>
      <div className='menu-container'>
        <div className='menu'>
          <div className={`menu-buttons`}>
            {renderMenuButtons()}
          </div>
          <span className='active-bar' style={
            display === 'Saved Colors' ? { margin: '0' }
              : display === 'Color Picker' ? { margin: '0 0 0 25%' }
                : { margin: '0 0 0 50%' }
          }>
          </span>
        </div>
      </div>
      <div className='mobile-menu'>
        <button className='dropdown-button' onClickCapture={toggleMenu}>
          {!isMenuVisible ? <AiOutlineMenu className='icon'></AiOutlineMenu> :
            <AiOutlineClose className='icon'></AiOutlineClose>}
        </button>
        <div className={`menu-buttons ${isMenuVisible ? 'menu-buttons-height fade-in' : 'fade-out'}`}>
          {renderMenuButtons()}
        </div>
      </div>

      <div className='component-container'>
        {display === 'Saved Colors' ? <SavedColors clickHandler={handleClick} data={savedColors} />
          : display === 'Color Picker' ? <ColorPicker clickHandler={handleClick} data={savedColors} />
            : <ColorWheel />}
      </div>
    </main>
  );
}

export default App;