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
              <p className={styles.tagline}>
                Your business is expanding beyond your local region. Or perhaps
                you are an Internet business with fulfillment centers in
                multiple locations. This may mean you are doing business in a
                “foreign” state. What do you do? We have the answers to all your
                questions regarding what constitutes doing business in another
                state and how to get the proper paperwork done to be legitimate.
                Many confuse foreign qualification with the idea of operating
                outside the United States. This really has to do with how you
                perform within the borders of the United States. “Foreign,” in
                this case, refers to the fact that each state has operating
                rules that are different from one another; and, in turn, must
                insist on proper registration to do business in that locale.
                Therefore, it is important that when your company is located in
                or operates within a state other than the place of original
                incorporation, you are given the proper rights to conduct
                business there. This actually means you need to obtain a
                Certificate of Authority.
                <br />
                <br />
                <b>
                  We can take care of the details. Let Filthy Rich Idea help you file
                  your Foreign Qualification today!
                </b>
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
