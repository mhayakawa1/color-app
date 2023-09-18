import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

 {/*Goals
- 
*/}
export default function ColorPicker(){
  const [savedColors, setSavedColors] = useState('');
  const [red, setRed] = useState(0);//rgb number values
  const [green, setGreen] = useState(0);
  const [blue, setBlue] = useState(0);
  const [rgbCode, setRgbCode] = useState('');
  const [hexCode, setHexCode] = useState('');
  const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f']

  const onStorageUpdate = (e) => {
    const { key, newValue } = e;
    if(key === 'savedColors'){
      setSavedColors(newValue)
    }
  }

  const handleChangeRGB = (event, color) =>{
    setHexCode('')
    let numValue;    
    function setColor(color){//set useState variable of selected color to number entered
      switch(color){
        case 'red': 
          setRed(numValue);
          localStorage.setItem('red', numValue);
          setRgbCode(`${event.target.value},${green},${blue}`);
          break;
        case 'green': 
          setGreen(numValue);
          localStorage.setItem('green', numValue);
          setRgbCode(`${red},${event.target.value},${blue}`);
          break;
        case 'blue': 
          setBlue(numValue);
          localStorage.setItem('blue', numValue);
          setRgbCode(`${red},${green},${event.target.value}`);
      }
    }
    if(event.target.value[0] === '0' && event.target.value.length > 1){
      //if num entered starts with 0 and the length is >1
      //set numValue to 0 and call setColor with selected color
      numValue = 0
      setColor(color)
    }else if(event.target.value >= 0 && event.target.value <= 255){
      //if num is between 0-255
      //set numValue to 0 and call setColor with selected color
      numValue = event.target.value
      setColor(color)
    }
  }

  const handleChangeHEX = (event) =>{
    //console.log(event.target.value)
  }

  const rgb2hex = () =>{
    let str = rgbCode.split(',')
    let arr = []
    for(let i = 0; i < str.length; i++){
      str[i] = str[i]/16
      str[i] = str[i].toString().split('.')
      str[i][1] = '.' + str[i][1]
      if(str[i][1] === '.undefined'){
        arr.push(hex[str[i][0]], '0')
      }else{
        arr.push(hex[str[i][0]], hex[str[i][1]*16])
      }
    }
    setHexCode(arr.join(''))
    console.log(hexCode)
  }

  useEffect(() => {
    setSavedColors(localStorage.getItem('savedColors') || '');
    setRed(localStorage.getItem('red') || '');
    setGreen(localStorage.getItem('green') || '');
    setBlue(localStorage.getItem('blue') || '');

    window.addEventListener('storage', onStorageUpdate);
    return () => {
      window.removeEventListener('storage', onStorageUpdate);
    };
  }, [])
  
  const saveColor = () => {
    let dupeColor = false;
    let currentColor = `${red},${green},${blue}`;
    let split = savedColors.split('*');
    for(let i = 0; i < split.length; i++){
      if(split[i] === currentColor){
        dupeColor = true
      }
    }
    if(dupeColor === false){
      setSavedColors(savedColors + '*' + currentColor)
      localStorage.setItem('savedColors', savedColors + '*' + currentColor)
    }
  }  

  const reset = () => {
    setRgbCode('0,0,0')
    setRed(0)
    setGreen(0)
    setBlue(0)
    localStorage.setItem('red', 0)
    localStorage.setItem('green', 0)
    localStorage.setItem('blue', 0)
  }

  return(    
  <div id='color-picker'>
    <h3>Color Picker</h3>
    <div className='color-picker-circle'
      style={{backgroundColor: `rgb(${red}, ${green}, ${blue})`}}>
    </div>
    <div className='input-container'>
      <div className='input-item'>
        <label>Red</label>
        <input className='input-number' type='number' value={`${red}`}
          onChange={event => handleChangeRGB(event, 'red')}/>
        <input type='range' min='0' max='255' value={`${red}`} className='slider'
          onChange={event => handleChangeRGB(event, 'red')}/>
      </div>
      <div className='input-item'>
        <label>Green</label>
        <input className='input-number' type='number' value={`${green}`}
          onChange={event => handleChangeRGB(event, 'green')}/>
        <input type='range' min='0' max='255' value={`${green}`} className='slider'
          onChange={event => handleChangeRGB(event, 'green')}/>
      </div>
      <div className='input-item'>
        <label>Blue</label>
        <input className='input-number' type='number' value={`${blue}`}
          onChange={event => handleChangeRGB(event, 'blue')}/>
        <input type='range' min='0' max='255' value={`${blue}`} className='slider'
          onChange={event => handleChangeRGB(event, 'blue')}/>
      </div>
    </div>
    <button onClick={rgb2hex}>Get HEX code</button>
    <button onClick={saveColor}>Save Color</button>
    <button onClick={reset}>Reset</button>
    <input onKeyDown={(event) => handleChangeHEX(event)}
      value={`#${hexCode.toUpperCase()}`}/>
  </div>
  )
}