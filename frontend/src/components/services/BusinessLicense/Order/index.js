import React from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import { BsArrowRightShort } from "react-icons/bs"
import styles from "./easy.module.scss"
import main from "../../../../images/services/amendment/article/main.webp"

function Order() {
  return (
    <div className={styles.wrap}>
      <Container>
        <Row className={styles.row}>
          <Col lg={7}>
            <div className={styles.textblock}>
              <h2 className={styles.heading}>
                Filthy Rich Idea's Business License Research Package
              </h2>
              <p className={styles.tagline}>
                With Filthy Rich Idea's Business License Research Package, you'll have
                everything you need to apply for your licenses and meet the
                requirements for your business.
              </p>
            </div>
            <div className={styles.registerNowContent}>
              <Button className={styles.btn}>
                Order now
                <BsArrowRightShort className={styles.icon} />
              </Button>
            </div>
          </Col>
          <Col lg={5}>
            <div className={styles.mainblock}>
              <img src={main} alt="main icon" className={styles.main} />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Order
