import React from "react"
import { Row, Col, Container } from "react-bootstrap"
import styles from "./research.module.scss"

const DbaVsLlc = () => {
  return (
    <div className={styles.wrap}>
      <Container>
        <div className={styles.textblock}>
          <h2 className={styles.heading}>DBA vs. LLC</h2>
          <p className={styles.tagline}>
            The main difference between a DBA and an LLC is that an LLC is a
            legally registered business entity, while a DBA is like a formal
            nickname for an already existing business.
          </p>
        </div>
        <Row className={styles.row}>
          <Col md={6}>
            <div className={styles.licenseCard}>
              <div className={styles.licenseCardContent}>Why Use an LLC?</div>
              <div className={styles.licenseCardPara}>
                We talk a lot about LLCs. They provide legal protections for the
                business owner, separating their personal assets from the
                business’s assets. LLC owners aren’t required to file a DBA.
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className={styles.licenseCard}>
              <div className={styles.licenseCardContent}>Why Use a DBA?</div>
              <div className={styles.licenseCardPara}>
                Since a DBA is just a nickname for your business, it doesn’t
                provide the same legal protections as an LLC. You are not
                protected under a DBA alone — you’ll need to form a business
                entity first.
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default DbaVsLlc
