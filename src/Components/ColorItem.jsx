import { useColors } from "../Contexts/ColorsContext";

const ColorItem = ({ color, hex, clickHandler, argumentList, buttonText }) => {
  const { copyText } = useColors();
  const rgb = color.join(",");
  const copiedFromSaved = buttonText === "Delete";
  return (
    <div className="color-block"
        style={{ backgroundColor: `rgb(${rgb})` }}>
      <div className="color-info">
        <p className="color-value">
          RGB:{" "}
          <span
            onClick={() => copyText(`(${rgb})`, copiedFromSaved)}
          >{`(${rgb})`}</span>
        </p>
        <p className="color-value">
          HEX:{" "}
          <span onClick={() => copyText(`#${hex}`, copiedFromSaved)}>
            #{hex}
          </span>
        </p>
        <button
          className="standard button-small"
          onClick={() => clickHandler(...argumentList)}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};
export default ColorItem;
