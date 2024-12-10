import React from "react"
import { Col, Container, Row } from "react-bootstrap"
import styles from "./article.module.scss"
import main from "../../../../images/services/amendment/article/main.webp"
function ResearchPackage() {
  return (
    <div className={styles.wrap}>
      <Container>
        <Row className={styles.row}>
          <Col lg={7}>
            <div className={styles.textblock}>
              <h2 className={styles.heading}>
                What comes with the Business License Research Package?
              </h2>
              <p className={styles.tagline}>
                Business licensing requirements vary from state to state, county
                to county and city to city. Government agencies frequently
                update their forms and change requirements for supporting
                documents. To make it easier, our trusted licensing partner will
                provide you with fresh forms and updates you with the latest
                licensing requirements to protect your business.
                <br />
                <br />
                Your customized Business License Research Package will be
                emailed to you 3 - 4 weeks from your company being filed by the
                state.
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

export default ResearchPackage
