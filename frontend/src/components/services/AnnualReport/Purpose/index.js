import React from "react"
import { Col, Container, Row } from "react-bootstrap"
import styles from "./article.module.scss"
import main from "../../../../images/services/amendment/article/main.webp"
function Purpose() {
  return (
    <div className={styles.wrap}>
      <Container>
        <Row className={styles.row}>
          <Col lg={7}>
            <div className={styles.textblock}>
              <h2 className={styles.heading}>
                What’s the Purpose of an Annual Report?
              </h2>
              <p className={styles.tagline}>
                The purpose of an annual report is to keep your state informed
                of your business’s activities throughout the previous year and
                declare any changes to the details or ownership of your business
                — for example, if the business has changed locations or has new
                directors or managers.
                <br />
                <br />
                Annual reports also provide shareholders and any other
                interested people with information about your business’s
                financial performance.
                <br />
                <br />
                Need to make changes to your business outside of the usual
                annual reporting time? No problem! You can file an Articles of
                Amendment form or have Filthy Rich Idea take care of it for you.
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

export default Purpose
