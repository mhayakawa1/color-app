import { useState } from "react";
import { useColors } from "../Contexts/ColorsContext";
import Button from "./Button";
import Feature from "./Feature";
import Controls from "./Controls";
import Display from "./Display";

export default function ColorPicker() {
  const { savedColors, updateColors, hexCharacters, convertHexToRGB } = useColors();
  const [hexCode, setHexCode] = useState("");
  const [rgbArray, setRGBArray] = useState([0, 0, 0]);
  const [rgbCode, setRGBCode] = useState(`0,0,0`);
  const [rgbValues, setRgbValues] = useState([
    {
      color: "red",
      value: 0,
    },
    {
      color: "green",
      value: 0,
    },
    {
      color: "blue",
      value: 0,
    },
  ]);
  const [isCopiedVisible, setIsCopiedVisible] = useState(false);

  const renderInputItems = () => {
    let inputItems = [];
    for (let i = 0; i < rgbValues.length; i++) {
      const color = rgbValues[i].color;
      const value = rgbValues[i].value;
      inputItems.push(
        <div key={i} className="input-item">
          <input
            type="range"
            min="0"
            max="255"
            value={value}
            className="slider"
            onChange={(event) => handleChangeRGB(event, i)}
          />
          <input
            className="input-number"
            type="number"
            value={value}
            onChange={(event) => handleChangeRGB(event, i)}
          />
          <label>{color.charAt(0).toUpperCase() + color.slice(1)}</label>
        </div>
      );
    }

    return inputItems;
  };

  const changeColor = (array) => {
    setHexCode("");

    let newRGB = [...rgbValues];
    for (let i = 0; i < newRGB.length; i++) {
      if (array[i] !== undefined) {
        newRGB[i].value = array[i];
      }
    }
    setRgbValues(newRGB);

    const newRgbValues = [
      rgbValues[0].value,
      rgbValues[1].value,
      rgbValues[2].value,
    ];
    setRGBArray(newRgbValues);
    setRGBCode(newRgbValues.join(","));
  };

  const handleChangeRGB = (event, index) => {
    const value = event.target.value;
    let values = [undefined, undefined, undefined];
    values[index] = value;
    changeColor(values);
  };

  const handleChangeHEX = (event) => {
    setHexCode(event.target.value.slice(1));
  };

  const handleKeyDown = (event) => {
    const keyValue = event.target.value;
    if (
      event.keyCode === 13 &&
      keyValue.length === 7 &&
      /^[A-Fa-f0-9]*$/.test(keyValue.slice(1)) === true
    ) {
      let hexInput = keyValue.toLowerCase().slice(1);
      const rgbOutput = convertHexToRGB(hexInput);
      for (let i = 0; i < rgbValues.length; i++) {
        rgbValues[i].value = rgbOutput[i];
      }
    }
    setRGBCode(rgbValues.map((i) => i.value).join(","));
  };

  const convertRgbToHex = () => {
    let hexOutput = [];
    const newRGBArray = [...rgbArray];
    for (let i = 0; i < newRGBArray.length; i++) {
      newRGBArray[i] = (newRGBArray[i] / 16).toString().split(".");
      newRGBArray[i][1] = "." + newRGBArray[i][1];
      if (newRGBArray[i][1] === ".undefined") {
        hexOutput.push(hexCharacters[newRGBArray[i][0]], "0");
      } else {
        hexOutput.push(
          hexCharacters[newRGBArray[i][0]],
          hexCharacters[newRGBArray[i][1] * 16]
        );
      }
    }
    setHexCode(hexOutput.join(""));
  };

  const saveColor = () => {
    if (!JSON.stringify(savedColors).includes(JSON.stringify(rgbArray))) {
      updateColors(rgbArray, false);
    }
  };

  const copyText = (colorCode) => {
    navigator.clipboard.writeText(colorCode);
    setIsCopiedVisible(true);
    setTimeout(() => {
      setIsCopiedVisible(false);
    }, 8000);
  };

  return (
    <Feature>
      <Controls className="color-picker-controls">
        <div className="input-container">{renderInputItems()}</div>
        <div className="hex-container">
          <button className="standard button-small" onClick={convertRgbToHex}>
            RGB → HEX
          </button>
          <input
            onChange={(event) => handleChangeHEX(event)}
            onKeyDown={(event) => handleKeyDown(event)}
            value={`#${hexCode.toUpperCase()}`}
          />
        </div>

        <div className="reset-save">
          <Button
            className="standard reset"
            handleClick={() => changeColor([0, 0, 0])}
            text="Reset"
          />
          <Button
            className="standard save"
            handleClick={saveColor}
            text="Save Color"
          />
        </div>
        <button
          className="random-color"
          onClick={() =>
            changeColor([
              Math.round(Math.random() * 255),
              Math.round(Math.random() * 255),
              Math.round(Math.random() * 255),
            ])
          }
          style={{
            filter: `drop-shadow(0px 0px 4px rgb(${rgbCode}))`,
            borderColor: `rgb(${rgbCode})`,
          }}
        >
          Random
          <br />
          Color
        </button>
      </Controls>

      <Display className="custom-color-display">
        <div
          className="custom-color-block"
          style={{ backgroundColor: `rgb(${rgbCode})` }}
        >
          <ul className="custom-color-info">
            <li>
              RGB:{" "}
              <span
                className="color-code"
                onClick={() => copyText(`(${rgbCode})`)}
              >
                {rgbCode}
              </span>
            </li>
            <li>
              HEX:{" "}
              {hexCode === "" ? (
                "-"
              ) : (
                <span
                  className="color-code"
                  onClick={() => copyText(`#${hexCode.toUpperCase()}`)}
                >
                  #{hexCode.toUpperCase()}
                </span>
              )}
            </li>
            {isCopiedVisible && (
              <li className={`copied fade-copied`}>Copied to clickboard!</li>
            )}
          </ul>
        </div>
      </Display>
    </Feature>
  );
}
