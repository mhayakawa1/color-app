import { useColors } from "../Contexts/ColorsContext";
import ColorItem from "./ColorItem";
import Filler from "./Filler";
import NoData from "./NoData";

export default function SingleColors() {
  const { singleColors, updateColors, hexCharacters } = useColors();
  const savedColorsLength = singleColors.length;
  const colorBoxes = () => {
    let boxes = [];
    for (let i = 0; i < savedColorsLength; i++) {
      let rgbValues = [...singleColors[i]];
      let hexValues = [];
      for (let j = 0; j < 3; j++) {
        rgbValues[j] = rgbValues[j] / 16;
        rgbValues[j] = rgbValues[j].toString().split(".");
        rgbValues[j][1] = "." + rgbValues[j][1];
        if (rgbValues[j][1] === ".undefined") {
          hexValues.push(hexCharacters[rgbValues[j][0]], "0");
        } else {
          hexValues.push(
            hexCharacters[rgbValues[j][0]],
            hexCharacters[rgbValues[j][1] * 16]
          );
        }
      }
      boxes.push(
        <ColorItem
          key={i}
          color={singleColors[i]}
          hex={hexValues.join("").toUpperCase()}
          clickHandler={updateColors}
          argumentList={[singleColors[i], true]}
          buttonText="Delete"
        />
      );
    }
    return boxes;
  };
  return (
    <div className="single-colors">
      {savedColorsLength === 0 ? <NoData string="colors" /> : colorBoxes()}
      {(savedColorsLength % 3 === 1 || savedColorsLength % 3 === 2) && (
        <Filler />
      )}
      {savedColorsLength % 3 === 1 && <Filler />}
    </div>
  );
}
