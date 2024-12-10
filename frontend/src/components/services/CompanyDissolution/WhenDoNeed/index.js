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
                How to Close an LLC or Corporation?
              </h2>
              <p className={styles.tagline}>
                A company begins with Articles of Incorporation when it is
                formed, therefore it makes sense that Articles must be filed to
                dissolve a company that has been in operation. Without filing
                the proper paperwork, the business owner will continue to be
                liable for taxes and other state requirements. Fortunately,
                closing a company is really a matter of paperwork.
                <br />
                <br />
                <b>
                  In order to properly close a corporation or LLC that is no
                  longer transacting business, the company must file Articles of
                  Dissolution with the state of incorporation. Neglecting to
                  file Articles of Dissolution for a company that is no longer
                  active may expose the corporation or LLC to unnecessary
                  recurring fees or taxes.
                </b>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Need
