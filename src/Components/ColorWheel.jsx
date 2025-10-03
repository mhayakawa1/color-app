import { useState } from "react";
import Feature from "./Feature";
import Controls from "./Controls";
import Display from "./Display";
import Circle from "./Circle";
import ColorName from "./ColorName";
import Option from "./Option";

export default function ColorWheel() {
  const [colorIndexes, setColorIndexes] = useState([0]);
  const [colorsInfo, setColorsInfo] = useState([
    { color: "red", active: false },
    { color: "red-orange", active: false },
    { color: "orange", active: false },
    { color: "orange-yellow", active: false },
    { color: "yellow", active: false },
    { color: "yellow-green", active: false },
    { color: "green", active: false },
    { color: "green-blue", active: false },
    { color: "blue", active: false },
    { color: "blue-purple", active: false },
    { color: "purple", active: false },
    { color: "purple-red", active: false },
  ]);

  const renderSchemeOptions = () => {
    let options = [];

    const optionsInfo = {
      Monochrome: "0",
      Complementary: "0 6",
      Analogous: "0 1 11",
      "Split-Complementary": "0 5 7",
      Triadic: "0 4 8",
      Tetradic: "0 2 6 8",
    };

    Object.entries(optionsInfo).forEach((item) => {
      options.push(<Option key={item[0]} item={item}></Option>);
    });

    return options;
  };

  const handleDropdown = (event) => {
    setColorIndexes(
      [
        ...event.target[event.target.selectedIndex]
          .getAttribute("data-numbers")
          .split(" "),
      ].map((value) => Number(value))
    );
  };

  const changeColorInfo = (reset, selectedColor) => {
    let newInfo = [
      ...colorsInfo.splice(
        colorsInfo.indexOf(colorsInfo.find((i) => i.color === selectedColor))
      ),
      ...colorsInfo.splice(0),
    ];
    newInfo.map((i) =>
      !reset && colorIndexes.includes(newInfo.indexOf(i))
        ? (i.active = true)
        : (i.active = false)
    );
    setColorsInfo(newInfo);
  };

  const renderColorNames = () => {
    let colorNames = [];

    for (let i = 0; i < colorsInfo.length; i++) {
      if (colorsInfo[i].active) {
        colorNames.push(<ColorName key={i} colorInfo={colorsInfo[i]} />);
      }
    }

    return colorNames;
  };

  const renderCircles = () => {
    let buttons = [];

    for (let i = 0; i < colorsInfo.length; i++) {
      buttons.push(
        <Circle
          key={i}
          changeColorInfo={changeColorInfo}
          colorInfo={colorsInfo[i]}
        />
      );
    }

    return buttons;
  };
  
  return (
    <Feature className="color-wheel-component">
      <Controls className="color-wheel-controls">
        <div className="controls-container">
          <div className="dropdown-container">
            <select className="color-scheme-dropdown" onChange={handleDropdown}>
              {renderSchemeOptions()}
            </select>
          </div>
          <button
            className="standard color-wheel-reset"
            onClick={() => changeColorInfo(true, "red")}
          >
            Reset
          </button>
        </div>
        {colorsInfo.filter((color) => color.active).length ? <ul className="color-names">{renderColorNames()}</ul> : null}
      </Controls>

      <Display className="color-wheel-display">
        <div className="wheel-container">{renderCircles()}</div>
      </Display>
    </Feature>
  );
}
