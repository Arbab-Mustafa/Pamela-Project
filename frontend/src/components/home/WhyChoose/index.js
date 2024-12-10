import React from "react"
import { Col, Container, Row } from "react-bootstrap"
import styles from "./why.module.scss"
import icon1 from "../../../images/home/whychoose/icon1.webp"
import icon2 from "../../../images/home/whychoose/icon2.webp"
import icon3 from "../../../images/home/whychoose/icon3.webp"

function WhyChoose() {
  return (
    <div className={styles.wrap}>
      <Container>
        <Row className={styles.row}>
          <Col lg={8}>
            <div className={styles.textblock}>
              <h2 className={styles.heading}>
                Why Choose Filthy Rich Idea for Company Formation?
              </h2>
              <p className={styles.tagline}>LLC Filing & More Made Easy</p>
              <p className={styles.subtitle}>
                We're entrepreneurs — just like you.
                <br />
                <br />
                We make incorporating a company as easy as possible, so you can
                focus on the important things. Beyond free LLC filing, we have a
                full suite of startup services (like banking and bookkeeping),
                which means Filthy Rich Idea not only helps you get started, but supports
                you in your continued success as your one-stop shop.
                <br />
                <br />
                Whether you’re starting an LLC, S Corp, C Corp or other business
                entity, our mission is to provide you with a superior and modern
                experience at an unparalleled value.
              </p>
            </div>
          </Col>
          <Col lg={4}>
            <div className={styles.iconblock}>
              <div className={styles.icon1block}>
                <img src={icon1} className={styles.icon1} alt="icon" />
              </div>
              <div className={styles.icon2block}>
                <img src={icon2} className={styles.icon2} alt="icon" />
              </div>
              <div className={styles.icon3block}>
                <img src={icon3} className={styles.icon3} alt="icon" />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default WhyChoose
