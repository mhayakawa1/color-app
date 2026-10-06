import { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import Links from "./Links";

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
      <Links className={isMenuVisible ? "links-height fade-in" : "fade-out"} />
    </div>
  );
};
export default MobileMenu;
