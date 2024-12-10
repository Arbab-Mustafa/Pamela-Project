import React from "react"
import { Button } from "react-bootstrap"
import { AiFillDelete } from "react-icons/ai"
import styles from "./detailCard.module.scss"

const DetailCard = ({
  type,
  title,
  editState = true,
  editClick,
  list,
  removeItem,
  children,
}) => {
  return (
    <>
      {type === "edit" ? (
        <>
          <div className={styles.detailCardWrapper}>
            <div className={styles.detailCardTitleWrapper}>
              <h2 className={styles.detailCardTitle}>{title}</h2>
              {editState && (
                <Button className={styles.editBtn} onClick={editClick}>
                  Edit
                </Button>
              )}
            </div>
            <div className={styles.detailCardContent}>{children}</div>
          </div>
        </>
      ) : (
        <>
          <div className={styles.detailCardWrapper}>
            <h2 className={styles.detailCardTitle}>
              {title}{" "}
              {list && (
                <AiFillDelete
                  color="#d4b768"
                  cursor="pointer"
                  onClick={removeItem}
                />
              )}
            </h2>
            <div className={styles.detailCardContent}>{children}</div>
          </div>
        </>
      )}
    </>
  )
}

export default DetailCard
