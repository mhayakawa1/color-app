import React, { useState } from 'react';
import Button from './Button';

export default function SavedColors(props) {
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const hexCharacters = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];
  const dataLength = props.data.length;
  const [isCopiedVisible, setIsCopiedVisible] = useState(false);

  const clearAll = (input) => {
    switch (input) {
      case 'clear all':
        setIsConfirmVisible(true);
        break;
      case true:
        props.clickHandler(props.data, true, true);
        setIsConfirmVisible(false)
        break;
      case false:
        setIsConfirmVisible(false);
    }
  }

  const copyText = (colorCode) => {
    navigator.clipboard.writeText(colorCode);
    setIsCopiedVisible(true);
    setTimeout(() => {
      setIsCopiedVisible(false);
    }, 8000);
  }

  const renderSavedColors = () => {
    let colorBlocks = [];
    for (let i = 0; i < dataLength; i++) {
      let rgbValues = [...props.data[i]];
      let hexValues = [];
      for (let j = 0; j < 3; j++) {
        rgbValues[j] = rgbValues[j] / 16;
        rgbValues[j] = rgbValues[j].toString().split('.');
        rgbValues[j][1] = '.' + rgbValues[j][1];
        if (rgbValues[j][1] === '.undefined') {
          hexValues.push(hexCharacters[rgbValues[j][0]], '0');
        } else {
          hexValues.push(hexCharacters[rgbValues[j][0]], hexCharacters[rgbValues[j][1] * 16]);
        }
      }
      const item = <div key={props.data[i]} className='color-item' >
        <div style={{ backgroundColor: `rgb(${props.data[i].join(',')})` }}
          className='color-block'>
        </div>
        <div className='color-info'>
          <p className='color-value'>RGB: <span onClick={() => copyText(`(${props.data[i].join(',')})`)}>{`(${props.data[i].join(',')})`}</span></p>
          <p className='color-value'>HEX: <span onClick={() => copyText(`#${hexValues.join('').toUpperCase()}`)}>#{hexValues.join('').toUpperCase()}</span></p>
          <button className='standard button-small'
            onClick={() => props.clickHandler(props.data[i], false, true)}
          >Delete</button>
        </div>
      </div>
      colorBlocks.push(item)
    }

    return (
      colorBlocks
    )
  }

  const filler = <div aria-hidden='true' className='container-filler'></div>;

  return (
    <div className='feature saved-colors'>
      <div className='controls'>
        <Button text='Clear All' handleClick={dataLength !== 0 ? () => clearAll('clear all') : undefined} className={`standard ${dataLength === 0 && 'disabled'}`} />
        <div className={isConfirmVisible ? 'confirm-clear-all' : 'hide-confirm'}>
          <p>Are you sure you want to clear all colors?</p>
          <div className='confirm-btns'>
            <Button text='Yes' handleClick={() => clearAll(true)} className='standard secondary button-small' />
            <Button text='No' handleClick={() => clearAll(false)} className='standard secondary button-small' />
          </div>
        </div>
        {isCopiedVisible && <p className={`copied fade-copied`}>Copied to clickboard!</p>}
      </div>

      <div className='display'>
        <div className='colors-container'>
          {dataLength === 0 ? <p className='no-colors'>You have no saved colors.</p> : renderSavedColors()}
          {dataLength % 3 === 1 && dataLength % 3 === 2 && filler}
          {dataLength % 3 === 1 && filler}
        </div>
      </div>
    </div>
  )
}