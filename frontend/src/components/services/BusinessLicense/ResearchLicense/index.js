import React from "react"
import { Row, Col, Container } from "react-bootstrap"
import license1 from "../../../../images/researchlicense/licenseCard1.webp"
import license2 from "../../../../images/researchlicense/licenseCard2.webp"
import license3 from "../../../../images/researchlicense/licenseCard3.webp"
import styles from "./research.module.scss"

const ResearchLicense = () => {
  return (
    <div className={styles.wrap}>
      <Container>
        <div className={styles.textblock}>
          <h2 className={styles.heading}>
            As part of the Business License Research Package, a licensing expert
            will...
          </h2>
        </div>
        <Row className={styles.row}>
          <Col md={6} lg={4}>
            <div className={styles.licenseCard}>
              <div className={styles.licenseCardImg}>
                <img src={license1} alt="" />
              </div>
              <div className={styles.licenseCardContent}>
                Determine all business licenses and permits required at the
                federal, state, county and municipal level.
              </div>
            </div>
          </Col>
          <Col md={6} lg={4}>
            <div className={styles.licenseCard}>
              <div className={styles.licenseCardImg}>
                <img src={license2} alt="" />
              </div>
              <div className={styles.licenseCardContent}>
                Provide you with the proper license/permit applications.
              </div>
            </div>
          </Col>
          <Col md={6} lg={4}>
            <div className={styles.licenseCard}>
              <div className={styles.licenseCardImg}>
                <img src={license3} alt="" />
              </div>
              <div className={styles.licenseCardContent}>
                List filing instructions, supporting document requirements, and
                fees.
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default ResearchLicense
