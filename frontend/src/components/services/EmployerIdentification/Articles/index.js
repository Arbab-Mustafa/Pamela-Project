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
                Do You Need a Federal EIN for Your Business Entity?
              </h2>
              <p className={styles.tagline}>
                In general, unless your business is a sole proprietorship with
                no employees and no separate legal entity for your business, you
                need to get an EIN. Sometimes if you own an LLC and it is a
                single-member LLC with simple accounting, you can get by just
                using your personal Social Security Number for tax purposes and
                for receiving payments from clients. But even the simplest
                businesses can generally benefit from using an EIN – the EIN
                serves as a tax ID for your LLC or other corporate entity.
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
