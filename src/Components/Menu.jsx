import Logo from "../MyColorsLogo.png";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Links from "./Links";

const Menu = () => {
  const location = useLocation();
  const [margin, setMargin] = useState("0");

  useEffect(() => {
    const components = {
      "/": "0",
      "/color-picker": "0 0 0 25%",
      "/color-palettes": "0 0 0 50%",
      "/color-wheel": "0 0 0 75%",
    };
    setMargin(components[location.pathname]);
  },[location.pathname]);
    
  return (
    <div className="menu-container">
      <div className="logo-container">
        <img src={Logo} alt="" />
        <span>MyColors</span>
      </div>
      <div className="menu">
        <Links className="" />
        <span
          className="active-bar"
          style={{ margin: margin }}
        ></span>
      </div>
    </div>
  );
};

export default Menu;
