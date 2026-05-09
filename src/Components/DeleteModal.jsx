import { useEffect } from "react";

export default function DeleteModal({ toggleModal }) {
  return (
    <div className="delete-modal">
      <div className="confirm-container">
        <p>Are you sure you want to delete this item?</p>
        <div className="confirm-buttons">
          <button onClick={()=>toggleModal(null, true)} className="standard button-small">
            Yes
          </button>
          <button onClick={()=>toggleModal(null, false)} className="standard button-small">
            No
          </button>
        </div>
      </div>
    </div>
  );
}
