import React, { useState, useContext, useEffect } from "react";
import SavedColors from "../Components/SavedColors";

export const ColorsContext = React.createContext();

export function useColors() {
  const value = useContext(ColorsContext);
  return value;
}

export const ColorsProvider = ({ children }) => {
  const [savedColors, setSavedColors] = useState([]);
  const [displayData, setDisplay] = useState({
    component: <SavedColors />,
    name: "Saved Colors",
    margin: "0",
  });

  const onStorageUpdate = (e) => {
    const { key, newValue } = e;
    if (key === "savedColors") {
      setSavedColors(newValue);
    }
  };

  useEffect(() => {
    setSavedColors(JSON.parse(localStorage.getItem("savedColors")) || []);
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
    localStorage.setItem("savedColors", JSON.stringify(colors));
  };

  const updateColors = (colorInput, deleteColor, clearAll) => {
    if (clearAll) {
      save([]);
    } else if (deleteColor) {
      save(savedColors.filter((color) => color !== colorInput));
    } else {
      const newSavedColors = [...savedColors, colorInput];
      save(newSavedColors);
    }
  };

  return (
    <ColorsContext.Provider
      value={{ savedColors, updateColors, switchComponent, displayData }}
    >
      {children}
    </ColorsContext.Provider>
  );
};
