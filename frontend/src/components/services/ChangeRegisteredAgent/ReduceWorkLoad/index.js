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
                What Happens If I Don’t Appoint or Report a Change in Registered
                Agents?
              </h2>
              <p className={styles.tagline}>
                All LLCs and corporations are required to designate a Registered
                Agent when they file with their Secretary of State.
                <br />
                <br />
                Failing to do so will cause you to fall out of good standing
                with the state and recieve some hefty fines.
                <br />
                <br />
                You'll also face fines if you change your Registered Agent
                without notifying the Secretary of State, and may be subject to
                revocation of your business license, your right to enter into
                legal contracts and your access to the state court system.
                <br />
                <br />
                <b>Reinstatement</b> proceedings could also include additional
                financial and legal hardships.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default ReduceWorkLoad
