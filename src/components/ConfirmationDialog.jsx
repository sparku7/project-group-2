import React from 'react';
import '../css/ConfirmationDialog.css';

function ConfirmationDialog({ message, onConfirm, onCancel }) {
    return (
        <div className="confirmation-overlay">
            <div className="confirmation-dialog">
                <p>{message}</p>
                <div className="button-container">
                    <button className="confirm-btn" onClick={onConfirm}>Confirm</button>
                    <button className="cancel-btn" onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmationDialog;
