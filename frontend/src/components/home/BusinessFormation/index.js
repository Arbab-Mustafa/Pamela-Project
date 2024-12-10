import React from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import { BsArrowRightShort } from "react-icons/bs"
import styles from "./business.module.scss"

import main from "../../../images/home/businessformation/main.webp"

function BusinessFormation() {
  return (
    <div className={styles.wrap}>
      <Container>
        <Row className={styles.row}>
          <Col lg={5}>
            <div className={styles.mainicon}>
              <img src={main} alt="main icon" className={styles.main} />
            </div>
          </Col>
          <Col lg={7}>
            <div className={styles.textblock}>
              <h2 className={styles.heading}>
                Business Formation for as Little as $0 + State Fee
              </h2>
              <h3 className={styles.tagline}>No Contracts. No Hidden Fees.</h3>
              <div className={styles.button}>
                <div className={styles.btnblock}>
                  <Button className={styles.btn}>Launch My Business</Button>
                  <BsArrowRightShort className={styles.icon} />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default BusinessFormation
