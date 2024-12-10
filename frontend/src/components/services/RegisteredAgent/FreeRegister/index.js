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
                Why Does Filthy Rich Idea Offer a Free Registered Agent?
              </h2>
              <p className={styles.tagline}>
                In addition to offering free LLC and other business formation,
                you’ll get your first year’s Registered Agent free too when you
                start a business with Filthy Rich Idea.
                <br />
                <br />
                Unlike other business formation specialists, our service isn’t
                built on finding ways to charge you for more products and
                services.
                <br />
                <br />
                We believe that entrepreneurs like you are the driving force
                behind our economy's growth. Entrepreneurs create innovative
                solutions and empowering change and we’re here for it.
                <br />
                <br />
                Radical offerings like our $0 business formation and a free
                Registered Agent with incorporation are available as a direct
                result of client loyalty. That loyalty enables us to grow our
                business and continue making tech-driven process efficiencies so
                that we’re able to offer you the best value.
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
