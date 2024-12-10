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
              <h2 className={styles.heading}>What Is an Annual Report?</h2>
              <p className={styles.tagline}>
                An annual report is a filing that provides details of your
                company's business activities over the previous year. Some
                states call annual reports for LLCs “Statements of Information.”
                <br />
                Annual reports give state governing authorities important
                information, including the names and addresses of directors or
                managing members of a corporation or LLC, as well as the company
                and Registered Agent address.
                <br />
                As a business manager, director or owner, you’re obliged to
                follow state regulations and meet certain requirements, one of
                which is to file an annual report for your LLC or corporation.
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
