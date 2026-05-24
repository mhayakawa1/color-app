import React, { useState, useContext, useEffect } from "react";
import SavedColors from "../Components/SavedColors";
import ColorItem from "../Components/ColorItem";

export const ColorsContext = React.createContext();

export function useColors() {
  const value = useContext(ColorsContext);
  return value;
}

export const ColorsProvider = ({ children }) => {
  const [singleColors, setSingleColors] = useState([]);
  const [palettes, setPalettes] = useState([]);
  const [isCopiedVisible, setIsCopiedVisible] = useState(false);
  const [copiedFromSaved, setCopiedFromSaved] = useState(true);
  const [mobileView, setMobileView] = useState(false);
  const [displayData, setDisplay] = useState({
    component: <SavedColors />,
    name: "Saved Colors",
    margin: "0",
  });
  const hexCharacters = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
  ];

  const onStorageUpdate = (e) => {
    const { key, newValue } = e;
    if (key === "singleColors") {
      setSingleColors(newValue);
    }
    if (key === "palettes") {
      setPalettes(newValue);
    }
  };

  useEffect(() => {
    try {
      const singleColorsValue = JSON.parse(
        localStorage.getItem("singleColors"),
      );
      const palettesValue = JSON.parse(localStorage.getItem("palettes"));
      if (singleColorsValue) {
        setSingleColors(singleColorsValue);
      }
      if (palettesValue) {
        setPalettes(palettesValue);
      }
    } catch (e) {
      console.warn("Unparseable value in localStorage, ignoring", e);
    }

    const handleResize = () => {
      if (window.innerWidth < 640) {
        setMobileView(true);
      } else if (window.innerWidth >= 640) {
        setMobileView(false);
      }
    };
    window.addEventListener("resize", handleResize);
    window.addEventListener("storage", onStorageUpdate);
    return () => {
      window.removeEventListener("storage", onStorageUpdate);
    };
  }, []);

  function switchComponent(component) {
    setDisplay(component);
  }

  const save = (data, storageItem) => {
    localStorage.setItem(storageItem, JSON.stringify(data));
    if (storageItem === "singleColors") {
      setSingleColors(data);
    } else {
      setPalettes(data);
    }
  };

  const updateColors = (colorInput, deleteColor, clearAll) => {
    let storageItem = "singleColors";
    let newData = [...singleColors];
    const isPalette = Boolean(colorInput.key);
    if (isPalette) {
      storageItem = "palettes";
      newData = palettes;
    }
    if (clearAll) {
      save([], storageItem);
    } else if (deleteColor) {
      newData = newData.filter((element) => {
        if (isPalette) {
          return element.key !== colorInput.key;
        }
        return element !== colorInput;
      });
      save(newData, storageItem);
    } else {
      newData.push(colorInput);
      save(newData, storageItem);
    }
  };

  const convertHexToRGB = (inputValue) => {
    let hexInput = inputValue.split("");
    for (let i = 0; i < hexInput.length; i++) {
      if (/[0-9]/.test(hexInput[i]) === false) {
        hexInput.splice(i, 1, hexCharacters.indexOf(hexInput[i]));
      } else {
        hexInput.splice(i, 1, Number(hexInput[i]));
      }
    }
    let rgbOutput = [];
    for (let i = 0; i < hexInput.length; i = i + 2) {
      rgbOutput.push(hexInput[i] * 16 + hexInput[i + 1]);
    }
    return rgbOutput;
  };

  const copyText = (colorCode, copiedFromSaved) => {
    navigator.clipboard.writeText(colorCode);
    setCopiedFromSaved(copiedFromSaved);
    setIsCopiedVisible(true);
    setTimeout(() => {
      setIsCopiedVisible(false);
    }, 3000);
  };

  const colorBlocks = (colors, toggleModal) => {
    const { length } = colors;
    let boxes = [];
    for (let i = 0; i < length; i++) {
      let rgbValues = [...colors[i]];
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
            hexCharacters[rgbValues[j][1] * 16],
          );
        }
      }
      boxes.push(
        <ColorItem
          key={i}
          color={colors[i]}
          hex={hexValues.join("").toUpperCase()}
          clickHandler={toggleModal}
          argumentList={[colors[i], true]}
          buttonText="Delete"
        />,
      );
    }
    return boxes;
  };

  return (
    <ColorsContext.Provider
      value={{
        colorBlocks,
        convertHexToRGB,
        copiedFromSaved,
        copyText,
        displayData,
        hexCharacters,
        isCopiedVisible,
        mobileView,
        palettes,
        singleColors,
        switchComponent,
        updateColors,
      }}
    >
      {children}
    </ColorsContext.Provider>
  );
};
