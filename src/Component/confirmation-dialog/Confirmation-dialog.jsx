import { useRef, useEffect } from "react";
import "./Confirmation-dialog.css";
function ConfirmationDialog({ isOpen, onClose, onConfirm }) {
  const dialogRef = useRef(null);

  // Open and close the dialog
  useEffect(() => {
    if (isOpen) {
      dialogRef.current.showModal(); 
    } else {
      dialogRef.current.close(); 
    }
  }, [isOpen]);

  // Handle the confirm button click
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <dialog ref={dialogRef} className="dialog-container">
      {/* Dialog Content */}
      <h3>Are you sure you want to delete this employee?</h3>
      {/* Dialog Buttons */}
      <div className="button-container">
      <button onClick={onClose}  className="button-design" >No</button>
      <button onClick={handleConfirm} className="button-design yes-button">Yes</button>
      </div>
    </dialog>
  );
}

export default ConfirmationDialog;
