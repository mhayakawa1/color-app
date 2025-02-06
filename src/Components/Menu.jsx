import { useColors } from "../Contexts/ColorsContext";
import MenuButtons from "./MenuButtons";

const Menu = () => {
  const { switchComponent, displayData } = useColors();

  return (
    <div className="menu-container">
      <div className="menu">
        <div className={`menu-buttons`}>
          <MenuButtons switchComponent={switchComponent} />
        </div>
        <span
          className="active-bar"
          style={{margin: displayData.margin}}
        ></span>
      </div>
    </div>
  );
};

export default Menu;
