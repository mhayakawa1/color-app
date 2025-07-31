import { useState } from "react";
import { useColors } from "../Contexts/ColorsContext";
import Button from "./Button";
import Feature from "./Feature";
import Controls from "./Controls";
import Display from "./Display";
import ColorItem from "./ColorItem";
import Filler from "./Filler";

export default function SavedColors() {
  const {
    savedColors,
    updateColors,
    isCopiedVisible,
    copiedFromSaved,
    hexCharacters,
  } = useColors();
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const savedColorsLength = savedColors.length;

  const clearAll = (input) => {
    switch (input) {
      default:
        alert("Invalid input.");
        break;
      case "clear all":
        setIsConfirmVisible(true);
        break;
      case true:
        updateColors(null, null, true);
        setIsConfirmVisible(false);
        break;
      case false:
        setIsConfirmVisible(false);
    }
  };

  const colorBoxes = () => {
    let boxes = [];
    for (let i = 0; i < savedColorsLength; i++) {
      let rgbValues = [...savedColors[i]];
      let hexValues = [];
      for (let j = 0; j < 3; j++) {
        rgbValues[j] = rgbValues[j] / 16;
        rgbValues[j] = rgbValues[j].toString().split(".");
        rgbValues[j][1] = "." + rgbValues[j][1];
        if (rgbValues[j][1] === ".undefined") {
          hexValues.push(hexCharacters[rgbValues[j][0]], "0");
        } else {
          hexValues.push(
            hexCharacters[rgbValues[j][0]],
            hexCharacters[rgbValues[j][1] * 16]
          );
        }
      }
      boxes.push(
        <ColorItem
          key={i}
          color={savedColors[i]}
          hex={hexValues.join("").toUpperCase()}
          clickHandler={updateColors}
          argumentList={[savedColors[i], true]}
          buttonText="Delete"
        />
      );
    }
    return boxes;
  };
  return (
    <Feature className="saved-colors">
      <Controls>
        <Button
          text="Clear All"
          handleClick={
            savedColorsLength !== 0 ? () => clearAll("clear all") : undefined
          }
          className={`standard ${savedColorsLength === 0 && "disabled"}`}
        />
        <div
          className={isConfirmVisible ? "confirm-clear-all" : "hide-confirm"}
        >
          <p>Are you sure you want to clear all colors?</p>
          <div className="confirm-btns">
            <Button
              text="Yes"
              handleClick={() => clearAll(true)}
              className="standard secondary button-small"
            />
            <Button
              text="No"
              handleClick={() => clearAll(false)}
              className="standard secondary button-small"
            />
          </div>
        </div>
        {isCopiedVisible && copiedFromSaved && (
          <p className={`copied fade-copied`}>Copied to clickboard!</p>
        )}
      </Controls>
      <Display>
        <div className="colors-container">
          {savedColorsLength === 0 ? (
            <p className="no-colors">You have no saved colors.</p>
          ) : (
            colorBoxes()
          )}
          {(savedColorsLength % 3 === 1 || savedColorsLength % 3 === 2) && (
            <Filler />
          )}
          {savedColorsLength % 3 === 1 && <Filler />}
        </div>
      </Display>
    </Feature>
  );
}
