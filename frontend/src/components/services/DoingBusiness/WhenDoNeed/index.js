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
              <h2 className={styles.heading}>Who Needs a DBA?</h2>
              <p className={styles.tagline}>
                If you’re a sole proprietorship or partnership, you’ll likely
                need a DBA. That’s because you’re unincorporated, so you didn’t
                file entity formation papers or choose a business name. Your
                legal name will be your business name unless you file a DBA.
                <br />
                <br />
                S and C corporations, LLCs and limited partnerships typically
                don’t need a DBA if they’re happy with their legal business
                name. On the contrary, franchise owners may want to file a DBA
                to indicate they’re operating a business under the franchise’s
                umbrella.
                <br />
                <br />
                No matter what type of business you're forming, make sure you
                check with your state on the proper process, or sign up for our
                DBA package and let us handle the rest.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Need
