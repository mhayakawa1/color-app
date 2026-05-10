import { useColors } from "../Contexts/ColorsContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import NoData from "./NoData";

export default function Palettes({ toggleModal }) {
  const { colorBlocks, palettes } = useColors();
  const palettesLength = palettes.length;

  const paletteRows = () => {
    const rows = [];
    for (let i = 0; i < palettes.length; i++) {
      rows.push(
        <div key={palettes[i].key} className="row">
          <button onClick={() => toggleModal(palettes[i], false)} className="delete">
            <FontAwesomeIcon icon={faX} />
          </button>
          <div className="boxes">{colorBlocks(palettes[i].colors)}</div>
        </div>,
      );
    }
    return rows;
  };

  return (
    <div className="palettes">
      {palettesLength === 0 ? <NoData string="palettes" /> : paletteRows()}
    </div>
  );
}
