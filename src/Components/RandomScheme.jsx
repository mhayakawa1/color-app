import React, { useState, useEffect } from 'react';

{/*https://www.colr.org/api.html
http://colormind.io/api/
*/}

export default function RandomScheme(props){
  const [savedColors, setSavedColors] = useState('');
  const [schemeArr, setSchemeArr] = useState([]);
  const [rgbArr, setRgbArr] = useState('');
  const hexVals = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];

const getAPI = () =>{
    fetch('http://colormind.io/api/', {
      method: 'POST',
      body: JSON.stringify({
        model: 'default'
      })
    })
    .then(res => res.json())
    .then(res => {
      setSchemeArr(res.result)
    })
  }

  const saveSchemeColor = (colors) =>{
    if(props.data.includes(colors) === false){
      props.clickHandler(colors, false, false)
    }
  }

  const saveAllColors = () =>{
    let toAdd = []
    for(let i = 0; i < schemeArr.length; i++){
      if(props.data.includes(schemeArr[i]) === false){
        toAdd.push(schemeArr[i])
      }
    }
    props.clickHandler(toAdd, true, false)
  }

  const colorSchemeLoop = () => {
    let renderScheme = []
    for(let i = 0; i < 5; i++){
      let color = schemeArr[i]
      let rgbInput = [...schemeArr[i]]
      let hexOutput = []
      for(let j = 0; j < 3; j++){
        rgbInput[j] = rgbInput[j]/16
        rgbInput[j] = rgbInput[j].toString().split('.')
        rgbInput[j][1] = '.' + rgbInput[j][1]
        if(rgbInput[j][1] === '.undefined'){
          hexOutput.push(hexVals[rgbInput[j][0]], '0')
        }else{
          hexOutput.push(hexVals[rgbInput[j][0]], hexVals[rgbInput[j][1]*16])
        }
      }
      
      if(schemeArr.length > 1){
        renderScheme.push(
          <div key={i} className='color-item'>
            <div style={{backgroundColor: `rgb(${color[0]},${color[1]},${color[2]})`}}
              className='color-block'>
            </div>
            <div className='color-info'>
              <p className='color-value'>RGB: {`${color[0]},${color[1]},${color[2]}`}</p>
              <p className='color-value'>HEX: #{hexOutput.join('').toUpperCase()}</p>
              <button className='btn-standard btn-small' onClick={() => saveSchemeColor(schemeArr[i])}>Save</button>
            </div>
          </div>
        )
      }
    }

    return(
      renderScheme
    )
  }

  return(
  <div className='component-container-2'>
    <div className='controls-container scheme-controls-container'>
      <button className='btn-standard' onClick={() => saveAllColors()}>Save All</button>
      <button className='btn-standard' onClick={getAPI}>New Color Scheme</button>
    </div>
    
    <div className='component-display'>
      <div className='colors-container'>
          {schemeArr.length === 0 ? <p className='no-colors'>Click "New Color Scheme" to view colors.</p> : colorSchemeLoop()}
          {schemeArr.length%3 === 1 || schemeArr.length%3 === 2 ? <div aria-hidden='true' className='container-filler'></div> : null}
          {schemeArr.length%3 === 1 ? <div aria-hidden='true' className='container-filler'></div> : null}
      </div>      
    </div>
  </div>
  )
}