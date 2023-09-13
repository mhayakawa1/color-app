import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

{/*Goals
- http://colormind.io/api-access/
https://www.colr.org/api.html
- Fetch random color scheme using API
- generate new one on button click
- Save colors, save whole scheme
*/}

export default function RandomScheme(){
  const[schemeArr, setSchemeArr] = useState('');

  const onStorageUpdate = (e) => {
    const { key, newValue } = e;
    if(key === 'schemeArr'){
      setSchemeArr(newValue)
    }
  }

  function getAPI(){
    //generate random number from 100 - 17969, insert it into url
    let randomNum = Math.floor(Math.random() * (17970-100) + 100);
    fetch(`https://www.colr.org/json/scheme/${randomNum}`)
    .then(res => res.json())
    .then(result => {
        //console.log(result.schemes[0].colors.join(','))
        setSchemeArr(result.schemes[0].colors.join(','))
        localStorage.setItem('schemeArr', result.schemes[0].colors.join(','));
    })
    .catch(err=>console.log(err))
  }

  const colorSchemeLoop = () => {
    //find way to convert hex to rgb
    let renderScheme = []
    let split = schemeArr.split(',')
    for(let i = 0; i < split.length; i++){
      renderScheme.push(
        <div style={{backgroundColor: `#${split[i]}`}}
          className='random-scheme-color-circle' key={i}></div>
      )
    }

    return(
      renderScheme
    )
  }

  useEffect(() => {
    setSchemeArr(localStorage.getItem('schemeArr') || '');
    window.addEventListener('storage', onStorageUpdate);
    if(schemeArr === ''){
      console.log(0)
    }
      return () => {
        window.removeEventListener('storage', onStorageUpdate);
      };
  },[]);
    
  return(
  <div>
    <h3>Random Color Scheme</h3>
    <button onClick={() => getAPI()}>Generate Color Scheme</button>
    <div className='color-scheme-container'>
      {colorSchemeLoop()}
    </div>
  </div>
  )
}