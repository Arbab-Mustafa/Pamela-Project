import React from "react"
import { Col, Container, Row } from "react-bootstrap"
import styles from "./need.module.scss"
import main from "../../../../images/services/amendment/article/main.webp"

function Need() {
  return (
    <div className={styles.wrap}>
      <Container>
        <Row className={styles.row}>
          <Col lg={4}>
            <div className={styles.mainblock}>
              <img src={main} alt="main icon" className={styles.main} />
            </div>
          </Col>
          <Col lg={8}>
            <div className={styles.textblock}>
              <h2 className={styles.heading}>
                Filthy Rich Idea’s Reinstatement Service Is Here to Help
              </h2>
              <p className={styles.tagline}>
                If your business has been dissolved because of non-compliance,
                you can restore your Good Standing and restart operations by
                filing an order of reinstatement with your state of formation.
                Filthy Rich Idea’s Reinstatement service takes care of the paperwork for
                you, making sure you follow the reinstatement procedures of your
                state.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Need
