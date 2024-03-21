import React, { useState, useEffect } from 'react';

export default function SavedColors(props){
  const [savedColors, setSavedColors] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const hexVals = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f']
  const [lastDeleted, setLastDeleted] = useState('');//create undo delete color feature?

  const clearAll = (str) => {
    switch(str){
      case 'clear all':
        setShowConfirm(true);
        break;
      case 'yes':
        console.log(savedColors)
        break;
      case 'no':
        setShowConfirm(false);
    }
  }

  const savedColorsLoop = () => {
    let itemsArr = []
    for(let i = 0; i < props.data.length; i++){
      let rgbInput = [...props.data[i]]
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

      const item = <div key={props.data[i]} className='color-item'>
        <div className='color-block' style={{backgroundColor: `rgb(${props.data[i].join(',')})`}}>
        </div>
        <div className='color-info'>
            <p className='color-value'>{`RGB: (${props.data[i].join(',')})`}</p>
            <p className='color-value'>HEX: #{hexOutput.join('').toUpperCase()}</p>
            <button className='btn-standard btn-small' 
            //onClick={() => deleteColor(splitArr[i])}
            >Delete</button>
        </div>
      </div>
        itemsArr.push(item)
    }
    
    return(
      itemsArr
    )
  }

  return(    
  <div className='component-container-2'>
    <div className='controls-container'>
      <button className='btn-standard'
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
        {props.data.length === 0 ? <p className='no-colors'>You have no saved colors.</p> : savedColorsLoop()}
        {props.data.length%3 === 1 || props.data.length%3 === 2 ? <div aria-hidden='true' className='container-filler'></div> : null}
        {props.data.length%3 === 1 ? <div aria-hidden='true' className='container-filler'></div> : null}
      </div>
    </div>
  </div>
  )
}