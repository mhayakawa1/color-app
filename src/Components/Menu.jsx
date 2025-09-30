import { useColors } from "../Contexts/ColorsContext";
import MenuButtons from "./MenuButtons";
import Logo from "../MyColorsLogo.png";

const Menu = () => {
  const { switchComponent, displayData } = useColors();

  return (
    <div className="menu-container">
      <div className="logo-container">
        <img src={Logo} alt="" />
        <span>MyColors</span>
      </div>
      <div className="menu">
        <div className={`menu-buttons`}>
          <MenuButtons switchComponent={switchComponent} />
        </div>
        <span
          className="active-bar"
          style={{ margin: displayData.margin }}
        ></span>
      </div>
    </div>
  );
};

export default Menu;
