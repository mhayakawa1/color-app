import React, { useState } from 'react';

export default function ColorPicker(props){
  const [red, setRed] = useState(0);
  const [green, setGreen] = useState(0);
  const [blue, setBlue] = useState(0);
  const [hexCode, setHexCode] = useState('');
  const [displayHexCode, setDisplayHexCode] = useState('');
  const hexVals = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f']

  const handleChangeRGB = (event, color) =>{
    setHexCode('')
    setDisplayHexCode('')
    let numValue;    
    function setColor(color){//set useState variable of selected color to number entered
      switch(color){
        case 'red': 
          setRed(event.target.value);
          break;
        case 'green': 
          setGreen(event.target.value);
          break;
        case 'blue': 
          setBlue(event.target.value);
      }
    }
    if(event.target.value[0] === 0 && event.target.value.length > 1){
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
      setDisplayHexCode(event.target.value.toUpperCase().slice(1))
      for(let i = 0; i < hexInput.length; i++){
        if(/[0-9]/.test(hexInput[i]) === false){
          hexInput.splice(i, 1, hexVals.indexOf(hexInput[i]))
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
    }
  }

  const rgbToHex = () =>{
    let rgbInput = [red, green, blue]
    let hexOutput = []
    for(let i = 0; i < rgbInput.length; i++){
      rgbInput[i] = rgbInput[i]/16
      rgbInput[i] = rgbInput[i].toString().split('.')
      rgbInput[i][1] = '.' + rgbInput[i][1]
      if(rgbInput[i][1] === '.undefined'){
        hexOutput.push(hexVals[rgbInput[i][0]], '0')
      }else{
        hexOutput.push(hexVals[rgbInput[i][0]], hexVals[rgbInput[i][1]*16])
      }
    }
    setHexCode(hexOutput.join(''))
    setDisplayHexCode(hexOutput.join(''))
  }

  const random = () =>{
    setHexCode('')
    setDisplayHexCode('')
    setRed(Math.round(Math.random() * (255)))
    setGreen(Math.round(Math.random() * (255)))
    setBlue(Math.round(Math.random() * (255)))
  }
  
  const reset = () => {
    setHexCode('')
    setDisplayHexCode('')
    setRed(0)
    setGreen(0)
    setBlue(0)
  }
  
  const saveColor = () => {
    let color = [red, green, blue]
    if(props.data.includes(color) === false){
      props.clickHandler(color, false, false)
    }
  }

  return(    
  <div className='component-container-2'>
    <div className='controls-container color-picker-controls'>
      <div className='input-container'>
        <div className='input-item'>
          <input type='range' min='0' max='255' value={red === '' ? 0 : red} className='slider'
            onChange={event => handleChangeRGB(event, 'red')}/>
          <input className='input-number' type='number' value={red === '' ? 0 : red}
            onChange={event => handleChangeRGB(event, 'red')}/>
          <label>Red</label>
        </div>
        <div className='input-item'>
          <input type='range' min='0' max='255' value={green === '' ? 0 : green} className='slider'
            onChange={event => handleChangeRGB(event, 'green')}/>
          <input className='input-number' type='number' value={green === '' ? 0 : green}
            onChange={event => handleChangeRGB(event, 'green')}/>
          <label>Green</label>
        </div>
        <div className='input-item'>
          <input type='range' min='0' max='255' value={blue === '' ? 0 : blue} className='slider'
            onChange={event => handleChangeRGB(event, 'blue')}/>
          <input className='input-number' type='number' value={blue === '' ? 0 : blue}
            onChange={event => handleChangeRGB(event, 'blue')}/>
          <label>Blue</label>
        </div>
      </div>
      <div className='hex-container'>
        <button className='btn-standard btn-small' onClick={rgbToHex}>RGB → HEX</button>
        <input onChange={(event) => handleChangeHEX(event)}
          onKeyDown={(event) => handleKeyDown(event)}
          value={`#${hexCode.toUpperCase()}`}/>
      </div>
      
      <div className='reset-save'>
        <button className='btn-standard reset' onClick={reset}>Reset</button>
        <button className='btn-standard save'onClick={saveColor}>Save Color</button>
      </div>
      <button className='random-color' onClick={random}
        style={{filter: `drop-shadow(0px 0px 4px rgb(${red === '' ? 0 : red},${green === '' ? 0 : green},${blue === '' ? 0 : blue}))`,
          borderColor: `rgb(${red === '' ? 0 : red},${green === '' ? 0 : green},${blue === '' ? 0 : blue})`}}>Random<br/>Color</button>
    </div>
    
    <div className='component-display custom-color-display'>
      <div className='custom-color-container'>
        <div className='custom-color-block'
          style={{backgroundColor: `rgb(${red === '' ? 0 : red},${green === '' ? 0 : green},${blue === '' ? 0 : blue})`}}>
        </div>
        <div className='custom-color-info'>
          <p>{`RGB: (${red === '' ? 0 : red},${green === '' ? 0 : green},${blue === '' ? 0 : blue})`}</p>
          <p>HEX: {displayHexCode === '' ? '-' : `#${displayHexCode.toUpperCase()}`}</p>
        </div>
      </div>
    </div>
  </div>
  )
}