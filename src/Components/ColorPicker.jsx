import React, { useState } from 'react';

export default function ColorPicker(props){
  const [hexCode, setHexCode] = useState('');
  const [displayHexCode, setDisplayHexCode] = useState('');
  const hexVals = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];
  const [rgbArray, setRGBArray ] = useState([0,0,0]);
  const [rgb, setRGB] = useState([
    {
      color: 'red',
      value: 0
    },
    {
      color: 'green',
      value: 0
    },
    {
      color: 'blue',
      value: 0
    }
  ])
  const [rgbCode, setRGBCode] = useState(`0,0,0`);

  const changeColor = (array) => {
    setHexCode('');
    setDisplayHexCode('');

    let newRGB = [...rgb];
    for(let i = 0; i < newRGB.length; i++){
      if(array[i] !== undefined){
        newRGB[i].value = array[i]
      }
    }
    setRGB(newRGB);

    //const rgbValues = 
    setRGBArray([rgb[0].value, rgb[1].value, rgb[2].value])
    setRGBCode(`${rgb[0].value},${rgb[1].value},${rgb[2].value}`);
  }

  const handleChangeRGB = (event, index) =>{
    const value = event.target.value;
    let numValue;
    let values = [undefined, undefined, undefined];
    values[index] = value;
    changeColor(values);

    if(value[0] === 0 && value.length > 1){
      numValue = 0;
    }else if(value >= 0 && value <= 255){
      numValue = value
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

      for(let i = 0; i < rgb.length; i++){
        rgb[i].value = rgbOutput[i]
      }
    }
  }

  const rgbToHex = () =>{
    let hexOutput = [];
    for(let i = 0; i < rgbArray.length; i++){
      rgbArray[i] = rgbArray[i]/16;
      rgbArray[i] = rgbArray[i].toString().split('.');
      rgbArray[i][1] = '.' + rgbArray[i][1];
      if(rgbArray[i][1] === '.undefined'){
        hexOutput.push(hexVals[rgbArray[i][0]], '0');
      }else{
        hexOutput.push(hexVals[rgbArray[i][0]], hexVals[rgbArray[i][1]*16]);
      }
    }
    setHexCode(hexOutput.join(''));
    setDisplayHexCode(hexOutput.join(''));
  }
  
  const saveColor = () => {
    if(props.data.includes(rgbArray) === false){
      props.clickHandler(rgbArray, false, false);
    }
  }

  return(    
  <div className='component-container-2'>
    <div className='controls-container color-picker-controls'>
      <div className='input-container'>
        <div className='input-item'>
          <input type='range' min='0' max='255' value={rgb[0].value} className='slider'
            onChange={event => handleChangeRGB(event, 0)}/>
          <input className='input-number' type='number' value={rgb[0].value}
            onChange={event => handleChangeRGB(event, 0)}/>
          <label>Red</label>
        </div>
        <div className='input-item'>
          <input type='range' min='0' max='255' value={rgb[1].value} className='slider'
            onChange={event => handleChangeRGB(event, 1)}/>
          <input className='input-number' type='number' value={rgb[1].value}
            onChange={event => handleChangeRGB(event, 1)}/>
          <label>Green</label>
        </div>
        <div className='input-item'>
          <input type='range' min='0' max='255' value={rgb[2].value} className='slider'
            onChange={event => handleChangeRGB(event, 2)}/>
          <input className='input-number' type='number' value={rgb[2].value}
            onChange={event => handleChangeRGB(event, 2)}/>
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
        <button className='btn-standard reset' onClick={() => changeColor([0,0,0])}>Reset</button>
        <button className='btn-standard save'onClick={saveColor}>Save Color</button>
      </div>
      <button className='random-color' onClick={() => changeColor([Math.round(Math.random() * (255)),Math.round(Math.random() * (255)),Math.round(Math.random() * (255))])}
        style={{filter: `drop-shadow(0px 0px 4px rgb(${rgbCode}))`,
          borderColor: `rgb(${rgbCode})`}}>Random<br/>Color</button>
    </div>
    
    <div className='component-display custom-color-display'>
        <div className='custom-color-block'
          style={{backgroundColor: `rgb(${rgbCode})`}}>
          <div className='custom-color-info'>
            <p>{`RGB: (${rgbCode})`}</p>
            <p>HEX: {displayHexCode === '' ? '-' : `#${displayHexCode.toUpperCase()}`}</p>
          </div>
        </div>
    </div>
  </div>
  )
}