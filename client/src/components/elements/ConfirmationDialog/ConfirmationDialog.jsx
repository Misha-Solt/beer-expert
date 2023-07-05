import React from 'react'
import styles from './confirmationDialog.module.css'

const ConfirmationDialog = ({ message, onConfirm, onCancel }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.dialog}>
        <p className={styles.message}>{message}</p>
        <div className={styles.buttonGroup}>
          <button className={styles.confirmButton} onClick={onConfirm}>
            Yes
          </button>
          <button className={styles.cancelButton} onClick={onCancel}>
            No
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationDialog

// {showConfirmation && (
//   <ConfirmationDialog
//     message="Are you sure you want to leave this page?"
//     onConfirm={handleConfirmationConfirm}
//     onCancel={handleConfirmationCancel}
//   />
// )}
