import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

{/*Goals
- generate circles for every color
- be able to delete colors with undo button
- delete all colors button - are you sure popup window
*/}

export default function SavedColors(){
  const [savedColors, setSavedColors] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f']
  const [lastDeleted, setLastDeleted] = useState('');//create undo delete color feature?

  const onStorageUpdate = (e) => {
    const { key, newValue } = e;
    if(key === 'savedColors'){
      setSavedColors(newValue)
    }
  }

  useEffect(() => {
    setSavedColors(localStorage.getItem('savedColors') || '');
    window.addEventListener('storage', onStorageUpdate);
      return () => {
        window.removeEventListener('storage', onStorageUpdate);
      };
    }, []);

  const clearAll = (str) => {
    switch(str){
      case 'clear all':
        setShowConfirm(true);
        break;
      case 'yes':
        setSavedColors('');
        localStorage.setItem('savedColors', '');
        setSavedColors('');
        localStorage.setItem('savedColors', '');
        setShowConfirm(false);
        break;
      case 'no':
        setShowConfirm(false);
    }
  }
  {/*
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
*/}

  const savedColorsLoop = () => {
    //convert rgb to hex
    let rgbInput = savedColors.split('*').splice(1)
    let hexOutput = []
    for(let i = 0; i < rgbInput.length; i++){
      let itemSplit = rgbInput[i].split(',');
      let itemStr = ''
      for(let j = 0; j < itemSplit.length; j++){
        itemSplit[j] = itemSplit[j]/16
        itemSplit[j] = itemSplit[j].toString().split('.')
        itemSplit[j][1] = '.' + itemSplit[j][1]
        if(itemSplit[j][1] === '.undefined'){
          //hexOutput.push(hex[itemSplit[j][0]], '0')
          itemStr = itemStr + hex[itemSplit[j][0]] + '0'
        }else{
          itemStr = itemStr + hex[itemSplit[j][0]] + hex[itemSplit[j][1]*16]
          //hexOutput.push(hex[itemSplit[j][0]], hex[itemSplit[j][1]*16])
        }
      }
      hexOutput.push(itemStr.toUpperCase())
    }

    let splitArr = savedColors.split('*');//array from savedColors, split into multiple arrays
    let itemsArr = []

    const deleteColor = (rgb) => {
      splitArr = splitArr.filter(elem => elem !== rgb)
      splitArr = splitArr.join('*')
      setSavedColors(splitArr)
      localStorage.setItem('savedColors', splitArr);
    }
    for(let i = 0; i < splitArr.length; i++){
      //replace all elements in splitArr with array made of each element
      splitArr.splice(i, 1, splitArr[i].split(','))
    }
    for(let i = 0; i < splitArr.length; i++){
      const item = <div key={`(${splitArr[i][0]}, ${splitArr[i][1]}, ${splitArr[i][2]})`} className='color-item'>
        <div className='color-square' style={{background: `rgb(${splitArr[i][0]}, ${splitArr[i][1]}, ${splitArr[i][2]})`}}>
        </div>
        <div className='color-info'>
            <p className='color-value'>{`RGB: (${splitArr[i][0]},${splitArr[i][1]},${splitArr[i][2]})`}</p>
            <p className='color-value'>HEX: #{hexOutput[i-1]}</p>
            <button className='btn-standard btn-small' onClick={() => deleteColor(splitArr[i])}>Delete</button>
          </div>
      </div>   
      if(splitArr[i][0] !== ''){
        itemsArr.push(item)
      }
    }
    return(
      itemsArr
    )
  }

  return(    
  <div className='component-container-2'>
    <div className='controls-container'>
      <button  className='btn-standard'
        onClick={savedColors === '' ? null : () => clearAll('clear all')}>Clear All</button>
        {showConfirm ? //popup to confirm action to clear all colors
        <div className='confirm-clear-all'>
          <p>Are you sure you want to clear all colors?</p>
          <button className='btn-standard btn-secondary btn-small' onClick={() => clearAll('yes')}>Yes</button>
          <button className='btn-standard btn-secondary btn-small' onClick={() => clearAll('no')}>No</button>
        </div> 
      : null}
    </div>

    <div className='component-display colors-container'>{savedColorsLoop()}</div>
  </div>
  )
}