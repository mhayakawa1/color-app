import { useColors } from "../Contexts/ColorsContext";

const ColorItem = ({ color, copyText, hexValues }) => {
  const { updateColors } = useColors();
  const rgb = color.join(",");
  const hex = hexValues.join("").toUpperCase();
  return (
    <div className="color-item">
      <div
        style={{ backgroundColor: `rgb(${rgb})` }}
        className="color-block"
      ></div>
      <div className="color-info">
        <p className="color-value">
          RGB: <span onClick={() => copyText(`(${rgb})`)}>{`(${rgb})`}</span>
        </p>
        <p className="color-value">
          HEX: <span onClick={() => copyText(`#${hex}`)}>#{hex}</span>
        </p>
        <button
          className="standard button-small"
          onClick={() => updateColors(color, true)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};
export default ColorItem;
