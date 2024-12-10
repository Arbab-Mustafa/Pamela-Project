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
                Why Use a Registered Agent Service?
              </h2>
              <p className={styles.tagline}>
                Registered Agent services like the one offered by Filthy Rich Idea help
                you avoid the hassles and inconvenience of managing all of your
                own documentation from the state.
                <br />
                <br />
                They also help preserve your privacy by setting up a
                public-facing address for your business that is separate from
                your home.
                <br />
                <br />
                When you use a Registered Agent service, any official legal or
                tax correspondence will be forwarded to your personal, private
                contact address. Filthy Rich Idea’s Registered Agent service also helps
                you stay on top of deadlines (such as required annual reports)
                to keep your business in good standing.
                <br />
                <br />A good Registered Agent service can help you respond
                quickly in the event of a lawsuit, avoid missed deadlines, fines
                and penalties for non-compliance, and otherwise manage the
                details of paperwork so you can focus on running your business.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Need
