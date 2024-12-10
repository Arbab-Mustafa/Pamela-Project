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
                Protect your business name with a trademark
              </h2>
              <p className={styles.tagline}>
                Protecting your trademark can really pay dividends. Not only is
                it a valuable property asset, but it’s also your brand, your
                reputation. The reputation you have established is associated
                with these different brand elements - your name, logo, and
                tagline - and the reason why people buy from you.
                <br />
                <br />
                It’s important to take steps to protect these company assets.
                Our partnered attorneys will do the research to make sure the
                mark isn't already taken, ensure the filing gets accepted by the
                government office, and provide sound legal advice throughout the
                entire process.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Need
