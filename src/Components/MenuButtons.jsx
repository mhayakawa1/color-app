import { useColors } from "../Contexts/ColorsContext";
import SavedColors from "./SavedColors";
import ColorPicker from "./ColorPicker";
import RandomScheme from "./RandomScheme";
import ColorWheel from "./ColorWheel";

const MenuButtons = () => {
  const { switchComponent } = useColors();
  let buttons = [];
  
  const components = [
    { component: <SavedColors />, name: "Saved Colors", margin: "0" },
    { component: <ColorPicker />, name: "Color Picker", margin: "0 0 0 25%" },
    { component: <RandomScheme />, name: "Color Schemes", margin: "0 0 0 50%" },
    { component: <ColorWheel />, name: "Color Wheel", margin: "0 0 0 75%" },
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
