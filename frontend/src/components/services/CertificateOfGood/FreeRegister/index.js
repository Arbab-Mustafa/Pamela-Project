import React from "react"
import { Col, Container, Row } from "react-bootstrap"
import styles from "./article.module.scss"
import main from "../../../../images/services/amendment/article/main.webp"
function FreeRegister() {
  return (
    <div className={styles.wrap}>
      <Container>
        <Row className={styles.row}>
          <Col lg={7}>
            <div className={styles.textblock}>
              <h2 className={styles.heading}>
                How Do I Get a Certificate of Good Standing?
              </h2>
              <p className={styles.tagline}>
                After you form your LLC or corporation, it’s important to stay
                up-to-date on filing your annual report, biennial report or
                other required forms and compliance paperwork. To stay in good
                standing, your business needs to meet a few key requirements,
                depending on your company’s home state. These typically include:
                <br />
                <ul>
                  <li>
                    Being up-to-date on annual or biennial fees to the Secretary
                    of State to register or renew your business
                  </li>
                  <li>Filing annual or biennial reports</li>
                  <li>
                    Paying any other necessary business fees or franchise taxes
                    to state regulators
                  </li>
                </ul>
                <br />
                To get a Certificate of Good Standing, you’ll need to file the
                appropriate form with your state, or Filthy Rich Idea can do it for you.
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

export default FreeRegister
