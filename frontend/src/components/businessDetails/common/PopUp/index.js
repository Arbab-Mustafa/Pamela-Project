import React from "react"
import { Modal } from "react-bootstrap"
import styles from "./style.module.scss"

const PopUp = ({ centered, show, handleClose, ...props }) => {
  return (
    <div className={styles.modalWrapper}>
      <Modal show={show} onHide={handleClose} centered={centered}>
        <Modal.Body>{props.children}</Modal.Body>
      </Modal>
    </div>
  )
}

export default PopUp
