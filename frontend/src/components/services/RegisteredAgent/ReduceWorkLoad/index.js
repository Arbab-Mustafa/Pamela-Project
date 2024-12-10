import React from "react"
import { Col, Container, Row } from "react-bootstrap"
import styles from "./need.module.scss"
import main from "../../../../images/services/amendment/need/main.png"

function ReduceWorkLoad() {
  return (
    <div className={styles.wrap}>
      <Container>
        <Row className={styles.row}>
          <Col lg={5}>
            <div className={styles.mainblock}>
              <img src={main} alt="main icon" className={styles.main} />
            </div>
          </Col>
          <Col lg={7}>
            <div className={styles.textblock}>
              <h2 className={styles.heading}>
                Reduce Your Workload Using a Registered Agent Service
              </h2>
              <p className={styles.tagline}>
                Save time and stress by letting Filthy Rich Idea manage your paperwork
                for you (for a lower cost than other providers)!
                <br />
                <br />
                Avoid missed deadlines, tiresome paperwork, noncompliance and
                the associated fines or penalties. Set yourself up for success
                and free up time to focus on what matters — your business.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default ReduceWorkLoad
