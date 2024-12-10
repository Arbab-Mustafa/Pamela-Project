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
                How Do You Get an EIN? Apply for an EIN Online
              </h2>
              <p className={styles.tagline}>
                Business owners can get an EIN by filing IRS Form SS-4. Filthy Rich Idea
                offers a convenient service to help you apply for an EIN online
                to obtain your EIN number quickly and efficiently. If you're
                looking for a way to get an EIN, whether in Texas, Florida,
                Michigan or anywhere in the United States, Filthy Rich Idea can provide
                one for you in one day. Apply for an EIN online with Filthy Rich Idea,
                and we'll obtain your federal tax ID electronically and have
                your new EIN back to you via email within one business day.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default ReduceWorkLoad
