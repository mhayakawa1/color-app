import React, { useState, useEffect } from 'react';

export default function SavedColors(props) {
  const [showConfirm, setShowConfirm] = useState(false);
  const hexVals = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];
  const dataLength = props.data.length;
  const [copiedVisible, setCopiedVisible] = useState(false);

  const clearAll = (input) => {
    switch (input) {
      case 'clear all':
        setShowConfirm(true);
        break;
      case true:
        props.clickHandler(props.data, true, true);
        setShowConfirm(false)
        break;
      case false:
        setShowConfirm(false);
    }
  }

  const copyText = (colorCode) => {
    navigator.clipboard.writeText(colorCode);
    setCopiedVisible(true);
    setTimeout(() => {
      setCopiedVisible(false);
    }, 8000);
  }

  const savedColorsLoop = () => {
    let itemsArr = [];
    for (let i = 0; i < dataLength; i++) {
      let rgbInput = [...props.data[i]];
      let hexOutput = [];
      for (let j = 0; j < 3; j++) {
        rgbInput[j] = rgbInput[j] / 16;
        rgbInput[j] = rgbInput[j].toString().split('.');
        rgbInput[j][1] = '.' + rgbInput[j][1];
        if (rgbInput[j][1] === '.undefined') {
          hexOutput.push(hexVals[rgbInput[j][0]], '0');
        } else {
          hexOutput.push(hexVals[rgbInput[j][0]], hexVals[rgbInput[j][1] * 16]);
        }
      }

      const item = <div key={props.data[i]} className='color-item' >
        <div style={{ backgroundColor: `rgb(${props.data[i].join(',')})` }}
          className='color-block'>
        </div>
        <div className='color-info'>
          <p className='color-value'>RGB: <span onClick={() => copyText(`(${props.data[i].join(',')})`)}>{`(${props.data[i].join(',')})`}</span></p>
          <p className='color-value'>HEX: <span onClick={() => copyText(`#${hexOutput.join('').toUpperCase()}`)}>#{hexOutput.join('').toUpperCase()}</span></p>
          <button className='btn-standard btn-small'
            onClick={() => props.clickHandler(props.data[i], false, true)}
          >Delete</button>
        </div>
      </div>
      itemsArr.push(item)
    }

    return (
      itemsArr
    )
  }

  const filler = <div aria-hidden='true' className='container-filler'></div>;

  return (
    <div className='component-container-2 saved-colors'>
      <div className='controls-container'>
        <button className='btn-standard'
          onClick={dataLength === 0 ? null : () => clearAll('clear all')}>Clear All</button>
        <div className={showConfirm ? 'confirm-clear-all' : 'hide-confirm'}>
          <p>Are you sure you want to clear all colors?</p>
          <div className='confirm-btns'>
            <button className='btn-standard btn-secondary btn-small' onClick={() => clearAll(true)}>Yes</button>
            <button className='btn-standard btn-secondary btn-small' onClick={() => clearAll(false)}>No</button>
          </div>
        </div>
        {copiedVisible ? <p className={`copied fade-copied`}>Copied to clickboard!</p> : null}
      </div>

      <div className='component-display'>
        <div className='colors-container'>
          {dataLength === 0 ? <p className='no-colors'>You have no saved colors.</p> : savedColorsLoop()}
          {dataLength % 3 === 1 && dataLength % 3 === 2 ? filler : null}
          {dataLength % 3 === 1 ? filler : null}
        </div>
      </div>
    </div>
  )
}