import { useColors } from "../Contexts/ColorsContext";

const ComponentContainer = () => {
  const { displayData } = useColors();
  
  return (
    <div className="component-container">
      {displayData.component}
    </div>
  );
};
export default ComponentContainer;
