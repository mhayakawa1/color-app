import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

export default function ColorPicker(){
  const [savedColors, setSavedColors] = useState('');
  const [red, setRed] = useState(0);//rgb number values
  const [green, setGreen] = useState(0);
  const [blue, setBlue] = useState(0);
  const [rgbCode, setRgbCode] = useState('');
  const [hexCode, setHexCode] = useState('000000');
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

  const handleChangeHEX = (event) => {
    setHexCode(event.target.value.slice(1))
  }

  const handleKeyDown = (event) => {
    if(event.keyCode === 13 && event.target.value.length === 7
        && /^[A-Fa-f0-9]*$/.test(event.target.value.slice(1)) === true){
      let hexInput = event.target.value.toLowerCase().slice(1).split('')
      for(let i = 0; i < hexInput.length; i++){
        if(/[0-9]/.test(hexInput[i]) === false){
          hexInput.splice(i, 1, hex.indexOf(hexInput[i]))
        }else{
          hexInput.splice(i, 1, Number(hexInput[i]))
        }
      }

      let rgbOutput = []
      for(let i = 0; i < hexInput.length; i = i + 2){
        rgbOutput.push(hexInput[i]*16 + hexInput[i+1])
      }
      
      setRed(rgbOutput[0]);
      setGreen(rgbOutput[1]);
      setBlue(rgbOutput[2]);
      localStorage.setItem('red', rgbOutput[0]);
      localStorage.setItem('green', rgbOutput[1]);
      localStorage.setItem('blue', rgbOutput[2]);
    }
  }

  const rgb2hex = () =>{
    setRgbCode(`${red},${green},${blue}`)
    let rgbInput = rgbCode.split(',')
    let hexOutput = []
    for(let i = 0; i < rgbInput.length; i++){
      rgbInput[i] = rgbInput[i]/16
      rgbInput[i] = rgbInput[i].toString().split('.')
      rgbInput[i][1] = '.' + rgbInput[i][1]
      if(rgbInput[i][1] === '.undefined'){
        hexOutput.push(hex[rgbInput[i][0]], '0')
      }else{
        hexOutput.push(hex[rgbInput[i][0]], hex[rgbInput[i][1]*16])
      }
    }
    setHexCode(hexOutput.join(''))
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
    setHexCode('000000')
    setRed(0)
    setGreen(0)
    setBlue(0)
    localStorage.setItem('red', 0)
    localStorage.setItem('green', 0)
    localStorage.setItem('blue', 0)
  }

  return(    
  <div className='component-container-2'>
    <div className='controls-container color-picker-controls'>
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
      <button onClick={rgb2hex}>Get HEX Value</button>
      <input onChange={(event) => handleChangeHEX(event)}
        onKeyDown={(event) => handleKeyDown(event)}
        value={`#${hexCode.toUpperCase()}`}/>
      <button onClick={reset}>Reset</button>
      <button onClick={saveColor}>Save Color</button>
    </div>
    
    <div className='component-display'>
      <div className='color-picker-square'
        style={{backgroundColor: `rgb(${red}, ${green}, ${blue})`}}>
      </div>
    </div>
  </div>
  )
}