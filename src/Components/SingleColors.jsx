import { useColors } from "../Contexts/ColorsContext";
import Filler from "./Filler";
import NoData from "./NoData";

export default function SingleColors({ toggleModal }) {
  const { colorBlocks, singleColors } = useColors();
  const savedColorsLength = singleColors.length;

  return (
    <div className="single-colors">
      {savedColorsLength === 0 ? (
        <NoData string="colors" />
      ) : (
        colorBlocks(singleColors, toggleModal)
      )}
      {(savedColorsLength % 3 === 1 || savedColorsLength % 3 === 2) && (
        <Filler />
      )}
      {savedColorsLength % 3 === 1 && <Filler />}
    </div>
  );
}
