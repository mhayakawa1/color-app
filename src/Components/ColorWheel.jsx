import React, { useState } from 'react';

export default function ColorWheel(){
  const [schemeType, setSchemeType] = useState('monochromatic');
  const [colorIndexes, setColorIndexes] = useState([0]);
  const [one, setOne] = useState(false);
  const [classesArr2, setClassesArr2] = useState({
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
    10: false,
    11: false
  })
  let classesArr = ['red', 'red-orange', 'orange', 'orange-yellow', 
  'yellow', 'yellow-green', 'green', 'green-blue',
  'blue', 'blue-purple', 'purple', 'purple-red'];
  let colorsArr = ['red', 'red-orange', 'orange', 'orange-yellow', 
  'yellow', 'yellow-green', 'green', 'green-blue',
  'blue', 'blue-purple', 'purple', 'purple-red'];
  let colorNamesArr = ['Red', 'Red Orange', 'Orange', 'Orange Yellow', 
  'Yellow', 'Yellow Green', 'Green', 'Green Blue',
  'Blue', 'Blue Purple', 'Purple', 'Purple Red'];
  let colorsInfo = [
    {color: 'red', active: false},
    {color: 'red-orange', active: false},
    {color: 'orange', active: false},
    {color: 'orange-yellow', active: false},
    {color: 'yellow', active: false},
    {color: 'yellow-green', active: false},
    {color: 'green', active: false},
    {color: 'green-blue', active: false},
    {color: 'blue', active: false},
    {color: 'blue-purple', active: false},
    {color: 'purple', active: false},
    {color: 'purple-red', active: false}
  ]
  
  let selectedColors = [];

  const handleDropdown = (event) => {
    setSchemeType(event.target.value);
    setColorIndexes([...event.target[event.target.selectedIndex].getAttribute('data-numbers').split(' ')]);
  }

  const changeSchemeType = (schemeType, arr) => {

  }

  const findColorScheme = (colorStr) => {
    colorsArr = [...colorsArr.splice(colorsArr.indexOf(colorStr)), ...colorsArr.splice(0)];
    colorsInfo = [...colorsInfo.splice(colorsInfo.indexOf(colorsInfo.find((i) => i.color = colorStr))), ...colorsInfo.splice(0)]
      .map((i) => console.log(i.active))  

    /*switch(schemeType){
      case 'monochromatic':
        selectedColors = [colorsArr[0]];
        break;
      case 'complementary':
        selectedColors = [colorsArr[0], colorsArr[6]];
        break;
      case 'analogous':
        selectedColors = [colorsArr[0], colorsArr[1], colorsArr[11]];
        break;
      case 'split-complementary':
        selectedColors = [colorsArr[0], colorsArr[5], colorsArr[7]];
        break;
      case 'triadic':
        selectedColors = [colorsArr[0], colorsArr[4], colorsArr[8]];
        break;
      case 'tetradic':
        selectedColors = [colorsArr[0], colorsArr[2], colorsArr[6], colorsArr[8]];
    }*/

    setOne(i => !i)

    for(let i = 0; i < classesArr.length; i++){
      if(selectedColors.includes(classesArr[i]) === true){        
        classesArr2[i] = true
      }else{
        classesArr2[i] = false
      }
    }
  }
  
  const colorNamesLoop = () => {
    let renderColorNames = []

    for(let i = 0; i < colorsArr.length; i++){
      if(classesArr2[i] === true){
        renderColorNames.push(
          //<li key={i}>{colorsArr[i].split('-').map((i) => i[0].toUpperCase() + i.substring(1, i.length)).join(' ')}</li>
        )
      }
    }    

   return(
    renderColorNames
   )
  }

  const reset = () => {
    classesArr = [...classesArr.splice(classesArr.indexOf('red')), ...classesArr.splice(0)];
    colorsArr = [...colorsArr.splice(colorsArr.indexOf('red')), ...colorsArr.splice(0)];
    selectedColors = [];
    setClassesArr2({
      0: false,
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
      6: false,
      7: false,
      8: false,
      9: false,
      10: false,
      11: false
    })
  }  

  return(
  <div className='component-container-2 color-wheel-component'>
    <div className='controls-container color-wheel-controls'>
      <div className='dropdown-container'>
        <select className='color-scheme-dropdown'
          onChange={handleDropdown}>
          <option value='monochgetAttribute' data-numbers='0'>Monochromatic</option>
          <option value='complementary' data-numbers='0 6'>Complementary</option>
          <option value='analogous' data-numbers='0 1 11'>Analogous</option>
          <option value='split-complementary' data-numbers='0 5 7'>Split-Complementary</option>
          <option value='triadic' data-numbers='0 4 8'>Triadic</option>
          <option value='tetradic' data-numbers='0 2 6 8'>Tetradic</option>      
        </select>
      </div>
      <button className='btn-standard color-wheel-reset' onClick={() => reset()}>Reset</button>
      <ul className='color-names-1'>
        {colorNamesLoop()}
      </ul>
    </div>

    <div className='component-display color-wheel-display'>
      <div className='wheel-container'>
        <button onClick={() => findColorScheme('red')} 
          className={`color-wheel-circle red ${classesArr2[0] ? 'dropshadow' : ''}`}></button>
        <button onClick={() => findColorScheme('red-orange')}
          className={`color-wheel-circle red-orange ${classesArr2[1] ? 'dropshadow' : ''}`}></button>
        <button onClick={() => findColorScheme('orange')} 
          className={`color-wheel-circle orange ${classesArr2[2] ? 'dropshadow' : ''}`}></button>
        <button onClick={() => findColorScheme('orange-yellow')} 
          className={`color-wheel-circle orange-yellow ${classesArr2[3] ? 'dropshadow' : ''}`}></button>
        <button onClick={() => findColorScheme('yellow')} 
          className={`color-wheel-circle yellow ${classesArr2[4] ? 'dropshadow' : ''}`}></button>
          <button onClick={() => findColorScheme('yellow-green')} 
          className={`color-wheel-circle yellow-green ${classesArr2[5] ? 'dropshadow' : ''}`}></button>
        <button onClick={() => findColorScheme('green')} 
          className={`color-wheel-circle green ${classesArr2[6] ? 'dropshadow' : ''}`}></button>
        <button onClick={() => findColorScheme('green-blue')} 
          className={`color-wheel-circle green-blue ${classesArr2[7] ? 'dropshadow' : ''}`}></button>
        <button onClick={() => findColorScheme('blue')} 
          className={`color-wheel-circle blue ${classesArr2[8] ? 'dropshadow' : ''}`}></button>
        <button onClick={() => findColorScheme('blue-purple')} 
          className={`color-wheel-circle blue-purple ${classesArr2[9] ? 'dropshadow' : ''}`}></button>
        <button onClick={() => findColorScheme('purple')} 
          className={`color-wheel-circle purple ${classesArr2[10] ? 'dropshadow' : ''}`}></button>
        <button onClick={() => findColorScheme('purple-red')} 
          className={`color-wheel-circle purple-red ${classesArr2[11] ? 'dropshadow' : ''}`}></button>
      </div>
      <ul className='color-names-2'>
        {/*colorNamesLoop()*/}
      </ul>
    </div>
  </div>
  )
}