import React, { useState } from 'react';

export default function ColorWheel() {
  const [colorIndexes, setColorIndexes] = useState([0]);

  const [colorsInfo, setColorsInfo] = useState(
    [
      { color: 'red', active: false },
      { color: 'red-orange', active: false },
      { color: 'orange', active: false },
      { color: 'orange-yellow', active: false },
      { color: 'yellow', active: false },
      { color: 'yellow-green', active: false },
      { color: 'green', active: false },
      { color: 'green-blue', active: false },
      { color: 'blue', active: false },
      { color: 'blue-purple', active: false },
      { color: 'purple', active: false },
      { color: 'purple-red', active: false }
    ]
  )

  const handleDropdown = (event) => {
    setColorIndexes([...event.target[event.target.selectedIndex]
      .getAttribute('data-numbers')
      .split(' ')].map((i) => Number(i)));
  }

  const changeColorInfo = (reset, selectedColor) => {
   let newInfo = [...colorsInfo.splice(colorsInfo.indexOf(colorsInfo.find((i) => i.color === selectedColor))), ...colorsInfo.splice(0)];
   newInfo.map((i) => !reset && colorIndexes.includes(newInfo.indexOf(i)) ? i.active = true : i.active = false);
   setColorsInfo(newInfo);   
  }

  const colorNamesLoop = () => {
    let renderColorNames = []

    for (let i = 0; i < colorsInfo.length; i++) {
      if (colorsInfo[i].active) {
        renderColorNames.push(
          <li key={i}>{colorsInfo[i].color.split('-').map((i) => i[0].toUpperCase() + i.substring(1, i.length)).join(' ')}</li>
        )
      }
    }

    return (
      renderColorNames
    )
  }

  const colorWheelButtons = () => {
    let buttonsArr = [];

    for (let i = 0; i < colorsInfo.length; i++) {
      buttonsArr.push(
        <button key={i} onClick={() => changeColorInfo(false, colorsInfo[i].color)}
          className={`color-wheel-circle ${colorsInfo[i].color} ${colorsInfo[i].active ? 'dropshadow' : ''}`}></button>
      )
    }

    return (
      buttonsArr
    )
  }

  return (
    <div className='component-container-2 color-wheel-component'>
      <div className='controls-container color-wheel-controls'>
        <div className='dropdown-container'>
          <select className='color-scheme-dropdown'
            onChange={handleDropdown}>
            <option value='monochrome' data-numbers='0'>Monochromatic</option>
            <option value='complementary' data-numbers='0 6'>Complementary</option>
            <option value='analogous' data-numbers='0 1 11'>Analogous</option>
            <option value='split-complementary' data-numbers='0 5 7'>Split-Complementary</option>
            <option value='triadic' data-numbers='0 4 8'>Triadic</option>
            <option value='tetradic' data-numbers='0 2 6 8'>Tetradic</option>
          </select>
        </div>
        <button className='btn-standard color-wheel-reset' onClick={() => changeColorInfo(true, 'red')}>Reset</button>
        <ul className='color-names-1'>
          {colorNamesLoop()}
        </ul>
      </div>

      <div className='component-display color-wheel-display'>
        <div className='wheel-container'>
          {colorWheelButtons()}
        </div>
        <ul className='color-names-2'>
          {colorNamesLoop()}
        </ul>
      </div>
    </div>
  )
}