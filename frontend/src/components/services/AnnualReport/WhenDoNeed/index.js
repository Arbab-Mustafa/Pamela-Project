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
                Who Needs to File an Annual Report?
              </h2>
              <p className={styles.tagline}>
                If you’ve incorporated a business — as an LLC, LLP, S Corp or C
                Corp — you must file an annual report (or equivalent report
                based on your state's schedule), normally with your Secretary of
                State. This applies no matter how big or small your business is.
                <br />
                Annual reports can be daunting and filing incorrectly (or not at
                all) can cause serious headaches and consequences later, such as
                late penalties, dissolution and loss of liability protection.
                <br />
                Avoid tiresome paperwork and the repercussions of noncompliance
                by letting Filthy Rich Idea take care of the paperwork for you. Free up
                your time to focus on what matters — your business.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Need
