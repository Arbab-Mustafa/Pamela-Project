import React from "react"
import { Container } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import styles from "./footer.module.scss"
import { selectService } from "../../../_features/commonSlice"

function Footer() {
  const headerService = useSelector((state) => state?.common?.services)
  const dispatch = useDispatch()
  return (
    <div className={styles.wrap}>
      <Container>
        <h2 className={styles.heading}>SEVICES</h2>
        <ul className={styles.ul}>
          {headerService?.map((value) => (
            <li key={value?.title}>
              <NavLink
                to={value?.slug}
                className={styles.list}
                onClick={() => dispatch(selectService(value))}
              >
                {value?.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  )
}

export default Footer
