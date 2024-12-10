import React from "react"
import { Col, Container, Row } from "react-bootstrap"
import styles from "./need.module.scss"
import main from "../../../../images/services/amendment/need/main.png"
import tick from "../../../../images/services/amendment/need/tick.svg"
const card = [
  {
    icon: tick,
    title: "Business address",
  },
  {
    icon: tick,
    title: "Business name",
  },
  {
    icon: tick,
    title: "Stated business activities",
  },
  {
    icon: tick,
    title: "Registered Agent",
  },
  {
    icon: tick,
    title: "Member information",
  },
  {
    icon: tick,
    title: "Number of authorized shares",
  },
]
function Need() {
  return (
    <div className={styles.wrap}>
      <Container>
        <Row className={styles.row}>
          <Col lg={5}>
            <div className={styles.mainblock}>
              <img src={main} alt="main icon" className={styles.main} />
            </div>
          </Col>
          <Col lg={7}>
            <div className={styles.textblock}>
              <h2 className={styles.heading}>
                When Do I Need to File Articles of Amendment?
              </h2>
              <p className={styles.tagline}>
                You need to file Articles of Amendment with your Secretary of
                State when your LLC, C Corp, S Corp or Nonprofit changes or
                modifies its:
              </p>
              <div className={styles.list}>
                {card.map((value) => (
                  <ul className={styles.ul} key={value.title}>
                    <img src={value?.icon} alt="tick" />
                    <li className={styles.li}>{value?.title}</li>
                  </ul>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Need
