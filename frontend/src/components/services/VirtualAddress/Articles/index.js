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
                Does My Business Need a Virtual Address ?
              </h2>
              <p className={styles.tagline}>
                It gives you access to a genuine street address for your
                business, so you can enjoy the benefits of mail scanning and a
                virtual mailbox wherever you are.
                <br />
                <br />
                We break down all the benefits of a Virtual Address below but
                it’s important to note that you will not have access to this
                location in person. Our scanning services bring the world of
                snail mail into the 21st century, meaning everything is done
                online. Virtual addresses can accept traditional mail, letters
                and checks but packages will not be accepted.
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
