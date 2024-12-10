import React from "react"
import { Col, Container, Row } from "react-bootstrap"
import styles from "./article.module.scss"
import main from "../../../../images/services/amendment/article/main.webp"
function FreeRegister() {
  return (
    <div className={styles.wrap}>
      <Container>
        <Row className={styles.row}>
          <Col lg={7}>
            <div className={styles.textblock}>
              <h2 className={styles.heading}>Where & When You'll Use an EIN</h2>
              <p className={styles.tagline}>
                Your EIN is necessary for several situations in running your
                business. You will need to use your EIN for certain tax forms,
                such as filing your tax returns for your business, and filling
                out W9 forms for clients (if you run a service business), and
                other forms related to managing payroll for your employees. Your
                EIN is also necessary to set up a business bank account and
                apply for business loans. The same types of reasons for needing
                a Social Security Number in your personal life are also the
                reasons to use an EIN in managing your business.
              </p>
            </div>
          </Col>
          <Col lg={5}>
            <div className={styles.mainblock}>
              <img src={main} alt="main icon" className={styles.main} />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default FreeRegister
