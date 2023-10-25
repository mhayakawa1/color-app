import React, { useState, useEffect } from 'react';

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
          itemStr = itemStr + hex[itemSplit[j][0]] + '0'
        }else{
          itemStr = itemStr + hex[itemSplit[j][0]] + hex[itemSplit[j][1]*16]
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
        <div className='color-block' style={{background: `rgb(${splitArr[i][0]}, ${splitArr[i][1]}, ${splitArr[i][2]})`}}>
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
          <div className='confirm-btns'>
            <button className='btn-standard btn-secondary btn-small' onClick={() => clearAll('yes')}>Yes</button>
            <button className='btn-standard btn-secondary btn-small' onClick={() => clearAll('no')}>No</button>
          </div>          
        </div> 
      : null}
    </div>

    <div className='component-display'>
      <div className='colors-container'>
        {savedColors.length === 0 ? <p className='no-colors'>You have no saved colors.</p> : savedColorsLoop()}
        {savedColors.split('*').splice(1).length%3 === 1 || savedColors.split('*').splice(1).length%3 === 2 ? <div aria-hidden='true' className='container-filler'></div> : null}
        {savedColors.split('*').splice(1).length%3 === 1 ? <div aria-hidden='true' className='container-filler'></div> : null}
      </div>
    </div>
  </div>
  )
}