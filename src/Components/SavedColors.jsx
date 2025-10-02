import { useState } from "react";
import { useColors } from "../Contexts/ColorsContext";
import Button from "./Button";
import Feature from "./Feature";
import Controls from "./Controls";
import Display from "./Display";
import ColorItem from "./ColorItem";
import SingleColors from "./SingleColors";
import Palettes from "./Palettes";

export default function SavedColors() {
  const {
    singleColors,
    updateColors,
    isCopiedVisible,
    copiedFromSaved,
    hexCharacters,
  } = useColors();
  const [singleColorsActive, setSingleColorsActive] = useState(true);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const savedColorsLength = singleColors.length;

  const toggleDisplay = (boolean) => {
    setSingleColorsActive(boolean);
  };

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
  
  return (
    <Feature className="saved-colors">
      <Controls>
        <div>
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
            <div className="confirm-buttons">
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
        </div>
        <div className="toggle-buttons">
          <button
            className={`standard button-small ${singleColorsActive ? "active" : 'inactive'}`}
            onClick={() => toggleDisplay(true)}
          >
            Single Colors
          </button>
          <button
            className={`standard button-small ${!singleColorsActive ? "active" : 'inactive'}`}
            onClick={() => toggleDisplay(false)}
          >
            Palettes
          </button>
        </div>
      </Controls>
      <Display>
        {singleColorsActive ? <SingleColors /> : <Palettes />}
      </Display>
    </Feature>
  );
}
