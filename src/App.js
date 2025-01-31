import "./App.css";
import React, { useState, useEffect } from "react";
import { ColorsProvider} from "./Contexts/ColorsContext";
import ColorPicker from "./Components/ColorPicker";
import ColorWheel from "./Components/ColorWheel";
import SavedColors from "./Components/SavedColors";
import Menu from "./Components/Menu";
import MenuButtons from "./Components/MenuButtons";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

function App() {
  const [display, setDisplay] = useState('Saved Colors');
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  
  function switchComponent(component) {
    setDisplay(component);
  }

  function toggleMenu() {
    setIsMenuVisible(!isMenuVisible);
  }

  return (
    <ColorsProvider>
      <main className="app">
        {/* <div className="menu-container">
          <div className="menu">
            <div className={`menu-buttons`}>
              <MenuButtons switchComponent={switchComponent} />
            </div>
            <span
              className="active-bar"
              style={
                display === 'Saved Colors'
                  ? { margin: "0" }
                  : display === 'Color Picker'
                  ? { margin: "0 0 0 25%" }
                  : { margin: "0 0 0 50%" }
              }
            ></span>
          </div>
        </div> */}
        <Menu />
        <div className="mobile-menu">
          <button className="dropdown-button" onClickCapture={toggleMenu}>
            {!isMenuVisible ? (
              <AiOutlineMenu className="icon"></AiOutlineMenu>
            ) : (
              <AiOutlineClose className="icon"></AiOutlineClose>
            )}
          </button>
          <div
            className={`menu-buttons ${
              isMenuVisible ? "menu-buttons-height fade-in" : "fade-out"
            }`}
          >
            <MenuButtons switchComponent={switchComponent} />
          </div>
        </div>

        <div className="component-container">
          {display === "Saved Colors" ? (
            <SavedColors />
          ) : display === "Color Picker" ? (
            <ColorPicker />
          ) : (
            <ColorWheel />
          )}
        </div>
      </main>
    </ColorsProvider>
  );
}

export default App;
