import { useColors } from "../Contexts/ColorsContext";
import ColorPicker from "./ColorPicker";
import ColorWheel from "./ColorWheel";
import SavedColors from "./SavedColors";

const MenuButtons = () => {
  const { switchComponent } = useColors();
  let buttons = [];
  
  const components = [
    { component: <SavedColors />, name: "Saved Colors", margin: "0" },
    { component: <ColorPicker />, name: "ColorPicker", margin: "0 0 0 25%" },
    { component: <ColorWheel />, name: "Color Wheel", margin: "0 0 0 50%" },
  ];
  
  for (let i = 0; i < components.length; i++) {
    buttons.push(
      <button
        key={i}
        className="menu-button"
        onClick={() => switchComponent(components[i])}
      >
        {components[i].name}
      </button>
    );
  }
  return buttons;
};

export default MenuButtons;
