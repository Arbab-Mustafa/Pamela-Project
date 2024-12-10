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
                Help to Obtain a Certificate of Good Standing
              </h2>
              <p className={styles.tagline}>
                Save on stress and let Filthy Rich Idea take care of the paperwork for
                you (for a lower cost than other providers!)
                <br />
                <br />
                To obtain a Good Standing Certificate, the business entity must
                be registered as a legal entity with the Secretary of State and
                cannot be in default of corporate regulations, suspended or
                revoked by the state.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default ReduceWorkLoad
