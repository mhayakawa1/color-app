import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

{/*Goals
- generate circles for every color
- be able to delete colors with undo button
- delete all colors button - are you sure popup window
*/}

export default function SavedColors(){  
  const [savedColors, setSavedColors] = useState('');
  const [showConfirm, setShowConfirm] = useState(false); //
  const [lastDeleted, setLastDeleted] = useState('');

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
      const item = <div key={`(${splitArr[i][0]}, ${splitArr[i][1]}, ${splitArr[i][2]})`} className='saved-color-item'>
        <div className='saved-color-circle' style={{background: `rgb(${splitArr[i][0]}, ${splitArr[i][1]}, ${splitArr[i][2]})`}}>
          <div className='saved-color-info'>
            <button className='delete-saved-color' onClick={() => deleteColor(splitArr[i])}>X</button>
            <p className='saved-color-value'>{`R ${splitArr[i][0]}`}</p>
            <p className='saved-color-value'>{`G ${splitArr[i][1]}`}</p>
            <p className='saved-color-value'>{`B ${splitArr[i][2]}`}</p>
          </div>
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
  <div>
    <h3>Your Saved Colors</h3>
    <div className='saved-colors-container'>{savedColorsLoop()}</div>

    <button onClick={savedColors === '' ? null : () => clearAll('clear all')}>Clear All</button>
    {showConfirm ? //popup to confirm action to clear all colors
      <div className='confirm-clear-all'>
        <p>Are you sure you want to clear all colors?</p>
        <button onClick={() => clearAll('yes')}>Yes</button>
        <button onClick={() => clearAll('no')}>No</button>
      </div> 
    : null}
  </div>
  )
}