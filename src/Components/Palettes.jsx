import { useState } from "react";
import { useColors } from "../Contexts/ColorsContext";
import NoData from "./NoData";
import ColorItem from "./ColorItem";
import Filler from "./Filler";

export default function Palettes() {
  const {
    palettes,
    updateColors,
    hexCharacters,
  } = useColors();
  const palettesLength = palettes.length;

  const colorBoxes = (colors) => {
    const { length } = colors;
    let boxes = [];
    for (let i = 0; i < length; i++) {
      let rgbValues = [...colors[i]];
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
            hexCharacters[rgbValues[j][1] * 16],
          );
        }
      }
      boxes.push(
        <ColorItem
          key={i}
          color={colors[i]}
          hex={hexValues.join("").toUpperCase()}
          clickHandler={updateColors}
          argumentList={[colors[i], true]}
          buttonText="Delete"
        />,
      );
    }
    return boxes;
  };

  const paletteRows = () => {
    const rows = [];
    for (let i = 0; i < palettes.length; i++) {
      rows.push(<div key={palettes[i].key} className="row">{colorBoxes(palettes[i].colors)}</div>);
    }
    return rows;
  };

  return (
    <div className="palettes">
      {palettesLength === 0 ? <NoData string="palettes" /> : paletteRows()}
    </div>
  );
}
