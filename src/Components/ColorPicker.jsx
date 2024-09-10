import React, { useState } from 'react';

export default function ColorPicker(props){
  const [red, setRed] = useState(0);
  const [green, setGreen] = useState(0);
  const [blue, setBlue] = useState(0);
  const [hexCode, setHexCode] = useState('');
  const [displayHexCode, setDisplayHexCode] = useState('');
  const hexVals = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];
  const rgbValues = [red, green, blue];

  const changeColor = (array) => {
    setHexCode('');
    setDisplayHexCode('');
    if(array[0] !== undefined){
      setRed(array[0]);
    }
    if(array[1] !== undefined){
      setGreen(array[1]);
    }
    if(array[2] !== undefined){
      setBlue(array[2]);
    }    
  }

  const handleChangeRGB = (event, input, index) =>{
    const value = event.target.value;
    setHexCode('');
    setDisplayHexCode('');
    let numValue;
    let redValue;
    let greenValue;
    let blueValue;

    if(value[0] === 0 && value.length > 1){
      numValue = 0;
    }else if(value >= 0 && value <= 255){
      numValue = value;
    }
    console.log(input)
    switch(input){
      case 'red':
        setRed(value);
        break;
      case 'green':
        setGreen(value);
        break;
      case 'blue':
        setBlue(value);
    }
  }

  const handleChangeHEX = (event) => {
    setHexCode(event.target.value.slice(1))
  }

  const handleKeyDown = (event) => {
    const keyValue = event.target.value;
    if(event.keyCode === 13 && keyValue.length === 7
        && /^[A-Fa-f0-9]*$/.test(keyValue.slice(1)) === true){
      let hexInput = keyValue.toLowerCase().slice(1).split('')
      setDisplayHexCode(keyValue.toUpperCase().slice(1))
      for(let i = 0; i < hexInput.length; i++){
        if(/[0-9]/.test(hexInput[i]) === false){
          hexInput.splice(i, 1, hexVals.indexOf(hexInput[i]));
        }else{
          hexInput.splice(i, 1, Number(hexInput[i]));
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
    let rgbInput = [...rgbValues];
    let hexOutput = [];
    for(let i = 0; i < rgbInput.length; i++){
      rgbInput[i] = rgbInput[i]/16;
      rgbInput[i] = rgbInput[i].toString().split('.');
      rgbInput[i][1] = '.' + rgbInput[i][1];
      if(rgbInput[i][1] === '.undefined'){
        hexOutput.push(hexVals[rgbInput[i][0]], '0');
      }else{
        hexOutput.push(hexVals[rgbInput[i][0]], hexVals[rgbInput[i][1]*16]);
      }
    }
    setHexCode(hexOutput.join(''));
    setDisplayHexCode(hexOutput.join(''));
  }
  
  const saveColor = () => {
    let color = [...rgbValues];
    if(props.data.includes(color) === false){
      props.clickHandler(color, false, false);
    }
  }

  return(    
  <div className='component-container-2'>
    <div className='controls-container color-picker-controls'>
      <div className='input-container'>
        <div className='input-item'>
          <input type='range' min='0' max='255' value={red === '' ? 0 : red} className='slider'
            onChange={event => handleChangeRGB(event, 'red', 0)}/>
          <input className='input-number' type='number' value={red === '' ? 0 : red}
            onChange={event => handleChangeRGB(event, 'red', 0)}/>
          <label>Red</label>
        </div>
        <div className='input-item'>
          <input type='range' min='0' max='255' value={green === '' ? 0 : green} className='slider'
            onChange={event => handleChangeRGB(event, 'green', 1)}/>
          <input className='input-number' type='number' value={green === '' ? 0 : green}
            onChange={event => handleChangeRGB(event, 'green', 1)}/>
          <label>Green</label>
        </div>
        <div className='input-item'>
          <input type='range' min='0' max='255' value={blue === '' ? 0 : blue} className='slider'
            onChange={event => handleChangeRGB(event, 'blue', 2)}/>
          <input className='input-number' type='number' value={blue === '' ? 0 : blue}
            onChange={event => handleChangeRGB(event, 'blue', 2)}/>
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
        <button className='btn-standard reset' onClick={() => changeColor(0,0,0)}>Reset</button>
        <button className='btn-standard save'onClick={saveColor}>Save Color</button>
      </div>
      <button className='random-color' onClick={() => changeColor([Math.round(Math.random() * (255)),Math.round(Math.random() * (255)),Math.round(Math.random() * (255))])}
        style={{filter: `drop-shadow(0px 0px 4px rgb(${red === '' ? 0 : red},${green === '' ? 0 : green},${blue === '' ? 0 : blue}))`,
          borderColor: `rgb(${red === '' ? 0 : red},${green === '' ? 0 : green},${blue === '' ? 0 : blue})`}}>Random<br/>Color</button>
    </div>
    
    <div className='component-display custom-color-display'>
        <div className='custom-color-block'
          style={{backgroundColor: `rgb(${red === '' ? 0 : red},${green === '' ? 0 : green},${blue === '' ? 0 : blue})`}}>
          <div className='custom-color-info'>
            <p>{`RGB: (${red === '' ? 0 : red},${green === '' ? 0 : green},${blue === '' ? 0 : blue})`}</p>
            <p>HEX: {displayHexCode === '' ? '-' : `#${displayHexCode.toUpperCase()}`}</p>
          </div>
        </div>
    </div>
  </div>
  )
}