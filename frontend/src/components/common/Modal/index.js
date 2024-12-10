import React from "react"
import { Modal, Button } from "react-bootstrap"
import { useDispatch } from "react-redux"
import styles from "./style.module.scss"

const CustomModal = ({
  centered,
  show,
  handleClose,
  deleteFunction,
  type,
  title,
  id,
  ...props
}) => {
  const dispatch = useDispatch()
  const deleteFunc = async () => {
    if (type === "delete") {
      const fn = await dispatch(deleteFunction(id))
      if (fn.payload.success) {
        return handleClose()
      }
      return
    }
    await deleteFunction(id)

    handleClose()
  }
  return (
    <div className={styles.modalWrapper}>
      <Modal show={show} onHide={handleClose} centered={centered}>
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.children}</Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} className="modal-btn-secondary">
            No
          </Button>
          <Button onClick={deleteFunc} className="modal-btn-primary">
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default CustomModal
