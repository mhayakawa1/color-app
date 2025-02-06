import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import MenuButtons from "./MenuButtons";

const MobileMenu = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [renderMenu, setRenderMenu] = useState(false);

  function toggleMenu() {
    setIsMenuVisible(!isMenuVisible);
    if (!renderMenu) {
      setRenderMenu(true);
    }
  }

  return (
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
        {renderMenu && <MenuButtons />}
      </div>
    </div>
  );
};
export default MobileMenu;
