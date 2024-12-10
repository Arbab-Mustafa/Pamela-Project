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
                The following business entities should get an EIN:
              </h2>
              <p className={styles.tagline}>
                <b>Partnerships:</b> an EIN is required for all general
                partnerships and limited partnerships.
                <br />
                <br />
                <b>Multiple-member LLCs:</b> This type of business entity needs
                an EIN regardless of whether you have employees.
                <br />
                <br />
                <b>Single-member LLCs:</b> If you plan to hire employees within
                the next 12 months, you will need to get an EIN. And even if
                your single-member LLC has no employees, and even if you can get
                by with using your own individual Social Security Number for tax
                purposes, it’s still a good idea to get an EIN because many
                banks and lenders will prefer to use an EIN to do business with
                you.
                <br />
                <br />
                <b>LLC taxed as a Corporation:</b> If your LLC chooses to be
                taxed as a Corporation (for example, by electing to be treated
                as an S-Corporation for tax purposes), you will need to get an
                EIN.
                <br />
                <br />
                <b>Sole proprietorship with employees:</b> Even if you do not
                have an LLC or any other legal entity for your business and you
                run a simple sole proprietorship, you still need to get an EIN
                if you have employees or plan to hire employees in the next 12
                months.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Need
