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
              <p className={styles.tagline}>
                Your business is expanding beyond your local region. Or perhaps
                you are an Internet business with fulfillment centers in
                multiple locations. This may mean you are doing business in a
                “foreign” state. What do you do? We have the answers to all your
                questions regarding what constitutes doing business in another
                state and how to get the proper paperwork done to be legitimate.
                <br />
                <br />
                Many confuse foreign qualification with the idea of operating
                outside the United States. This really has to do with how you
                perform within the borders of the United States. “Foreign,” in
                this case, refers to the fact that each state has operating
                rules that are different from one another; and, in turn, must
                insist on proper registration to do business in that locale
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Need
