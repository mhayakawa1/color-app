import React, { useState } from 'react';
import Feature from './Feature';
import Controls from './Controls';
import Display from './Display';

const Circle = ({ changeColorInfo, colorInfo }) => {
  const {color, active} = colorInfo;
  return (
    <button onClick={() => changeColorInfo(false, color)}
     className={`circle ${color} ${active && 'dropshadow'}`}></button>
  )
}

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

  const renderSchemeOptions = () => {
    let options = [];

    const optionsInfo = {
      'monochrome': '0',
      'complementary': '0 6',
      'analogous': '0 1 11',
      'split-complementary': '0 5 7',
      'triadic': '0 4 8',
      'tetradic': '0 2 6 8'
    }

    Object.entries(optionsInfo).forEach(entry => {
      const [key, value] = entry;
      options.push(
        <option key={key} value={key} data-numbers={value}>{key[0].toUpperCase() + key.substring(1, key.length)}</option>
      )
    })

    return (
      options
    )
  }

  const handleDropdown = (event) => {
    setColorIndexes([...event.target[event.target.selectedIndex]
      .getAttribute('data-numbers')
      .split(' ')].map((value) => Number(value)));
  }

  const changeColorInfo = (reset, selectedColor) => {
    let newInfo = [...colorsInfo.splice(colorsInfo.indexOf(colorsInfo.find((i) => i.color === selectedColor))), ...colorsInfo.splice(0)];
    newInfo.map((i) => !reset && colorIndexes.includes(newInfo.indexOf(i)) ? i.active = true : i.active = false);
    setColorsInfo(newInfo);
  }

  const renderColorNames = () => {
    let colorNames = [];

    for (let i = 0; i < colorsInfo.length; i++) {
      if (colorsInfo[i].active) {
        colorNames.push(
          <li key={i}>{colorsInfo[i].color.split('-').map((i) => i[0].toUpperCase() + i.substring(1, i.length)).join(' ')}</li>
        )
      }
    }

    return (
      colorNames
    )
  }

  const renderCircles = () => {
    let buttons = [];

    for (let i = 0; i < colorsInfo.length; i++) {
      buttons.push(
        <Circle key={i} changeColorInfo={changeColorInfo} colorInfo={colorsInfo[i]} />
      )
    }

    return (
      buttons
    )
  }

  return (
    <Feature className='color-wheel-component'>
      <Controls className='color-wheel-controls'>
        <div className='dropdown-container'>
          <select className='color-scheme-dropdown'
            onChange={handleDropdown}>
            {renderSchemeOptions()}
          </select>
        </div>
        <button className='standard color-wheel-reset' onClick={() => changeColorInfo(true, 'red')}>Reset</button>
        <ul className='color-names'>
          {renderColorNames()}
        </ul>
      </Controls>

      <Display className='color-wheel-display'>
        <div className='wheel-container'>
          {renderCircles()}
        </div>
        <ul className='color-names-mobile'>
          {renderColorNames()}
        </ul>
      </Display>
    </Feature>
  )
}