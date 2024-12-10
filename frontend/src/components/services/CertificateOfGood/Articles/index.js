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
                What Is a Certificate of Good Standing?
              </h2>
              <p className={styles.tagline}>
                A Certificate of Good Standing is an official document issued by
                your state’s Secretary of State office to verify that your
                business is compliant within the state of incorporation and
                therefore is in “good standing.” Just like having a driver’s
                license or other forms of personal ID, a Certificate of Good
                Standing proves that your LLC or corporation is officially
                registered and authorized to operate in your home state.
                <br />
                <b>A Certificate of Good Standing can also be known as:</b>
                <ul>
                  <li>Certificate of Existence</li>
                  <li>Certificate of Authorization</li>
                  <li>Certificate of Status</li>
                </ul>
                The Good Standing Certificate is a one-page document provided by
                the Secretary of State and gives conclusive evidence of the
                status of your business entity. In many cases it can be valid up
                to three months.
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
