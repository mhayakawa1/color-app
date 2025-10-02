import { useState } from "react";
import { useColors } from "../Contexts/ColorsContext";
import Feature from "./Feature";
import Controls from "./Controls";
import Display from "./Display";
import Filler from "./Filler";
import ColorItem from "./ColorItem";

export default function RandomScheme() {
  const {
    singleColors,
    updateColors,
    isCopiedVisible,
    copiedFromSaved,
    hexCharacters,
    convertHexToRGB,
  } = useColors();
  const [schemeColors, setSchemeColors] = useState([]);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setIsErrorMessage] = useState("");

  const getAPI = () => {
    let colorCode = "";
    for (let i = 0; i < 6; i++) {
      const index = Math.floor(Math.random() * 16);
      colorCode += hexCharacters[index];
    }
    fetch(`https://api.apiverve.com/v1/colorpalette?color=${colorCode}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-api-key": "10bad6e5-5a5f-4f9c-abb1-62222730ffac",
      },
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => {
        const {
          data: { colorPaletteRaw },
        } = result;
        const newSchemeArr = [];
        for (let i = 0; i < colorPaletteRaw.length; i++) {
          newSchemeArr.push(convertHexToRGB(colorPaletteRaw[i]));
        }
        setSchemeColors(newSchemeArr);
        if (isError) {
          setIsError(false);
        }
      })
      .catch((error) => {
        setIsError(true);
        setIsErrorMessage(error.toString());
      });
  };

  const saveSchemeColor = (color) => {
    if (singleColors.includes(color) === false) {
      updateColors(color, false, false);
    }
  };

  const saveAllColors = () => {
    let toAdd = [];
    for (let i = 0; i < schemeColors.length; i++) {
      if (singleColors.includes(schemeColors[i]) === false) {
        toAdd.push(schemeColors[i]);
      }
    }
    updateColors(toAdd, false, false);
  };

  const colorSchemeLoop = () => {
    let renderScheme = [];
    for (let i = 0; i < schemeColors.length; i++) {
      let color = schemeColors[i];
      let rgbInput = [...schemeColors[i]];
      let hexValues = [];
      for (let j = 0; j < 3; j++) {
        rgbInput[j] = rgbInput[j] / 16;
        rgbInput[j] = rgbInput[j].toString().split(".");
        rgbInput[j][1] = "." + rgbInput[j][1];
        if (rgbInput[j][1] === ".undefined") {
          hexValues.push(hexCharacters[rgbInput[j][0]], "0");
        } else {
          hexValues.push(
            hexCharacters[rgbInput[j][0]],
            hexCharacters[rgbInput[j][1] * 16]
          );
        }
      }
      if (schemeColors.length > 1) {
        renderScheme.push(
          <ColorItem
            key={i}
            color={color}
            hex={hexValues.join("").toUpperCase()}
            clickHandler={saveSchemeColor}
            argumentList={[color]}
            buttonText="Save"
          />
        );
      }
    }
    return renderScheme;
  };

  return (
    <Feature>
      <Controls className="scheme-controls">
        <button className="standard" onClick={() => saveAllColors()}>
          Save All
        </button>
        <button className="standard" onClick={getAPI}>
          New Color Scheme
        </button>
        {isCopiedVisible && !copiedFromSaved && (
          <p className={`copied fade-copied`}>Copied to clickboard!</p>
        )}
      </Controls>

      <Display>
        {isError ? (
          <p className="no-colors">{errorMessage}</p>
        ) : (
          <div className="colors-container">
            {schemeColors.length === 0 ? (
              <p className="no-colors">
                Click "New Color Scheme" to view colors.
              </p>
            ) : (
              colorSchemeLoop()
            )}
            {(schemeColors.length % 3 === 1 ||
              schemeColors.length % 3 === 2) && <Filler />}
            {schemeColors.length % 3 === 1 ? <Filler /> : null}
          </div>
        )}
      </Display>
    </Feature>
  );
}
