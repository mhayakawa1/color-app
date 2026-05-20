import { useEffect } from "react";

export default function DeleteModal({ singleItem, toggleModal }) {
  return (
    <div className="delete-modal">
      <div className="confirm-container">
        <p>
          Are you sure you want to delete 
          {singleItem ? " this item?" : " all items?"}
        </p>
        <div className="confirm-buttons">
          <button
            onClick={() => toggleModal(null, true, true)}
            className="standard button-small"
          >
            Yes
          </button>
          <button
            onClick={() => toggleModal(null, false, false)}
            className="standard button-small"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
