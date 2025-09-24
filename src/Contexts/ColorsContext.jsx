import React, { useState, useContext, useEffect } from "react";
import SavedColors from "../Components/SavedColors";

export const ColorsContext = React.createContext();

export function useColors() {
  const value = useContext(ColorsContext);
  return value;
}

export const ColorsProvider = ({ children }) => {
  const [savedColors, setSavedColors] = useState([]);
  const [isCopiedVisible, setIsCopiedVisible] = useState(false);
  const [copiedFromSaved, setCopiedFromSaved] = useState(true);
  const [mobileView, setMobileView] = useState(false);
  const [displayData, setDisplay] = useState({
    component: <SavedColors />,
    name: "Saved Colors",
    margin: "0",
  });
  const storageItem = "savedColors";
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
    if (key === "savedColors") {
      setSavedColors(newValue);
    }
  };

  useEffect(() => {
    try {
      const val = JSON.parse(localStorage.getItem("savedColors"));
      if (Array.isArray(val)) {
        setSavedColors(val);
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

  const save = (colors) => {
    setSavedColors(colors);
    localStorage.setItem(storageItem, JSON.stringify(colors));
  };

  const updateColors = (colorInput, deleteColor, clearAll) => {
    if (clearAll) {
      save([]);
    } else if (deleteColor) {
      save(savedColors.filter((color) => color !== colorInput));
    } else {
      const newSavedColors = [...savedColors];
      if (typeof colorInput[0] === "number") {
        newSavedColors.push(colorInput);
      } else {
        newSavedColors.push(...colorInput);
      }
      save(newSavedColors);
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

  return (
    <ColorsContext.Provider
      value={{
        convertHexToRGB,
        copiedFromSaved,
        copyText,
        displayData,
        hexCharacters,
        isCopiedVisible,
        mobileView,
        savedColors,
        switchComponent,
        updateColors,
      }}
    >
      {children}
    </ColorsContext.Provider>
  );
};
