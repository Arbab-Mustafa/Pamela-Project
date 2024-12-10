import React from "react"
import { Col, Container, Row } from "react-bootstrap"
import styles from "./article.module.scss"
import main from "../../../../images/services/amendment/article/main.webp"
function Article() {
  return (
    <div className={styles.wrap}>
      <Container>
        <Row className={styles.row}>
          <Col lg={7}>
            <div className={styles.textblock}>
              <h2 className={styles.heading}>
                What Are Articles of Amendment?
              </h2>
              <p className={styles.tagline}>
                Articles of Amendment are filed when a company makes a
                significant change to their Articles of Incorporation or
                Articles of Organization that were created when the business
                first formed.
                <br />
                <br />
                As an organization, you’re always evolving, shifting and
                improving. This means you’ll inevitably need to change some of
                the important parameters of your business. That’s where Articles
                of Amendment come in.
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

export default Article
