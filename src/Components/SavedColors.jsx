import { useState } from "react";
import { useColors } from "../Contexts/ColorsContext";
import Button from "./Button";
import Feature from "./Feature";
import Controls from "./Controls";
import Display from "./Display";
import SingleColors from "./SingleColors";
import Palettes from "./Palettes";
import DeleteModal from "./DeleteModal";

export default function SavedColors() {
  const {
    singleColors,
    palettes,
    updateColors,
    isCopiedVisible,
    copiedFromSaved,
  } = useColors();
  const [singleColorsActive, setSingleColorsActive] = useState(true);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteData, setDeleteData] = useState([]);
  const [singleItem, setSingleItem] = useState(true);
  const savedColorsLength = singleColors.length;
  const palettesLength = palettes.length;

  const toggleDisplay = (boolean) => {
    setSingleColorsActive(boolean);
  };

  const toggleModal = (colorInput, confirmDelete, clearAll) => {
    setDeleteData(colorInput);
    setModalVisible((current) => !current);
    if (clearAll)
      if (confirmDelete) {
        updateColors(deleteData, true, clearAll);
      }
    if (!confirmDelete && clearAll) {
      setSingleItem(false);
    } else {
      setSingleItem(true);
    }
  };

  return (
    <Feature className="saved-colors">
      {modalVisible ? (
        <DeleteModal singleItem={singleItem} toggleModal={toggleModal} />
      ) : null}
      <Controls>
        <div className="saved-left-panel">
          <Button
            text="Clear All"
            handleClick={() => {
              toggleModal(
                singleColorsActive ? [] : { key: "key" },
                false,
                true,
              );
            }}
            // handleClick={savedColorsLength !== 0 ? () => clearAll() : undefined}
            className={`standard ${(savedColorsLength && singleColorsActive) || (palettesLength && !singleColorsActive) ? "" : "disabled"}`}
          />
          {/* <div
            className={isConfirmVisible ? "confirm-clear-all" : "hide-confirm"}
          >
            <p>Are you sure you want to clear all items?</p>
            <div className="confirm-buttons">
              <Button
                text="Yes"
                handleClick={() => toggleModal([], true, true)}
                className="standard secondary button-small"
              />
              <Button
                text="No"
                handleClick={() => toggleModal([], false, false)}
                className="standard secondary button-small"
              />
            </div>
          </div> */}
          {isCopiedVisible && copiedFromSaved && (
            <p className={`copied fade-copied`}>Copied to clickboard!</p>
          )}
        </div>
        <div className="toggle-buttons">
          <button
            className={`standard button-small ${singleColorsActive ? "active" : "inactive"}`}
            onClick={() => toggleDisplay(true)}
          >
            Single Colors
          </button>
          <button
            className={`standard button-small ${!singleColorsActive ? "active" : "inactive"}`}
            onClick={() => toggleDisplay(false)}
          >
            Palettes
          </button>
        </div>
      </Controls>
      <Display>
        {singleColorsActive ? (
          <SingleColors toggleModal={toggleModal} />
        ) : (
          <Palettes toggleModal={toggleModal} />
        )}
      </Display>
    </Feature>
  );
}
