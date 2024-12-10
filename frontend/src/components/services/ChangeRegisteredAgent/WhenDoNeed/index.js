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
                How Do I Change a Registered Agent?
              </h2>
              <p className={styles.tagline}>
                To change your Registered Agent, you need to fill out a "Change
                of Registered Agent" form in your particular state.
                <br />
                <br />
                The forms used to process your order, the processing fee and
                information needed varies by state, so it’s crucial to adhere to
                the specific requirements listed by your Secretary of State.
                <br />
                <br />
                You need to fill out the specific form for your state (or other
                listed forms if required) and send them in along with any
                required fee.
                <br />
                <br />
                It can be complicated and daunting, but Filthy Rich Idea is here to help.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Need
