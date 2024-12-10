import React from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import { BsArrowRightShort } from "react-icons/bs"
import styles from "./easy.module.scss"
// import main from "../../../../images/services/amendment/article/main.webp"
import tick from "../../../../images/services/amendment/need/tick.svg"
const card = [
  {
    icon: tick,
    title: "Legal counsel from an experienced trademark attorney",
  },
  {
    icon: tick,
    title: "A thorough search of existing trademarks",
  },
  {
    icon: tick,
    title: "The preparing and filing of a trademark application",
  },
]

function Order() {
  return (
    <div className={styles.wrap}>
      <Container>
        <Row className={styles.row}>
          <Col lg={7}>
            <div className={styles.textblock}>
              <h2 className={styles.heading}>
                Help with trademark registration
              </h2>
              <p className={styles.tagline}>What’s included in the package?</p>
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
          <Col lg={5}>
            <div className={styles.form}>
              <h3 className={styles.title}>Register a Trademark</h3>
              <h4 className={styles.tagline}>$74</h4>
              <p className={styles.tagline2}>+ Filing Fee*</p>
              <div className={styles.button}>
                <div className={styles.btnblock}>
                  <Button className={styles.btn}>
                    Order Now
                    <BsArrowRightShort className={styles.icon} />
                  </Button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Order
