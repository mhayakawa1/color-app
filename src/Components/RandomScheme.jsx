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
  const [savedColors, setSavedColors] = useState('');
  const [schemeArr, setSchemeArr] = useState('');
  const [rgbArr, setRgbArr] = useState('');
  const hexArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];

  const onStorageUpdate = (e) => {
    const { key, newValue } = e;
    if(key === 'schemeArr'){
      setSchemeArr(newValue)
    }
  }

  const hex2rgb = (arr) =>{
    for(let i = 0; i < arr.length; i++){
      arr[i] = arr[i].split('')
      for(let j = 0; j < arr[i].length; j++){
        if (/[0-9]/.test(arr[i][j]) === false) {
          arr[i].splice(j, 1, hexArr.indexOf(arr[i][j]))
        }
      }
      let arr2 = []
      for(let k = 0; k < 6; k = k + 2){
        arr2.push(arr[i][k]*16 + Number(arr[i][k+1]))
      }
      arr[i] = arr2
    }
    setRgbArr(arr.join('*'));
    localStorage.setItem('rgbArr', arr.join('*'));
  }

  function getAPI(){
    //generate random number from 100 - 17969, insert it into url
    let randomNum = Math.floor(Math.random() * (17970-100) + 100);
    fetch(`https://www.colr.org/json/scheme/${randomNum}`)
    .then(res => res.json())
    .then(result => {
        setSchemeArr(result.schemes[0].colors.join(','))
        localStorage.setItem('schemeArr', result.schemes[0].colors.join(','));
        hex2rgb(result.schemes[0].colors)
    })
    .catch(err=>console.log(err))
  }

  const saveSchemeColor = (i) =>{
    if(savedColors.includes(rgbArr.split('*')[i]) === false){
      setSavedColors(savedColors + '*' + rgbArr.split('*')[i])
      localStorage.setItem('savedColors', savedColors + '*' + rgbArr.split('*')[i]);
    }
  }

  const saveAllColors = () =>{   
    let split1 = rgbArr.split('*');
    let arr = [];
    for(let i = 0; i < split1.length; i++){
      if(savedColors.split('*').includes(split1[i]) === false){
        arr.push(split1[i])
      }
    }
    setSavedColors(savedColors + '*' + arr.join('*'))
    localStorage.setItem('savedColors', savedColors + '*' + arr.join('*'));
  }
 
  const colorSchemeLoop = () => {
    let renderScheme = []
    let split = schemeArr.split(',')
    for(let i = 0; i < split.length; i++){
      if(split.length > 1){     
        renderScheme.push(
          <div key={i}>
            <div style={{backgroundColor: `#${split[i]}`}}
              className='random-scheme-color-circle'>
            </div>
            <div className='scheme-color-info'>
              <button onClick={() => saveSchemeColor(i)}>Save</button>
              <p>HEX: #{split[i].toUpperCase()}</p>
              <p>RGB: {rgbArr.split('*')[i]}</p>
            </div>
          </div>
        )
      }
    }

    return(
      renderScheme
    )
  }

  useEffect(() => {
    setSavedColors(localStorage.getItem('savedColors') || '');
    setSchemeArr(localStorage.getItem('schemeArr') || '');
    setRgbArr(localStorage.getItem('rgbArr') || '');
    window.addEventListener('storage', onStorageUpdate);
      return () => {
        window.removeEventListener('storage', onStorageUpdate);
      };
  },[]);

  const clear = () =>{
    setSchemeArr('')
    localStorage.setItem('schemeArr', '');
  }

  return(
  <div>
    {/*<button onClick={() => clear()}>Clear</button>*/}
    <button onClick={() => saveAllColors()}>Save All</button>
    <button onClick={() => getAPI()}>Generate Color Scheme</button>
    <div className='color-scheme-container'>
      {colorSchemeLoop()}
    </div>
  </div>
  )
}