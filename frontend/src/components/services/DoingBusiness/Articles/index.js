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
              <h2 className={styles.heading}>What Is a DBA?</h2>
              <p className={styles.tagline}>
                A DBA stands for “doing business as” and is a registered name
                you give your business (or part of your business) that is
                different from its legal registered name.
                <br />
                <br />
                DBAs are typically filed with the Secretary of State or other
                entity that governs business formation in your state. If your
                business operates in multiple states, you'll likely need to file
                a DBA in every single state. Want to make the process easier on
                yourself? You can file a DBA online with Filthy Rich Idea in a snap (more
                on that below).
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
