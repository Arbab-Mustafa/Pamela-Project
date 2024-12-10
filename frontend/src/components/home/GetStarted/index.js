import React from "react"
import { Button, Container } from "react-bootstrap"
import { BsArrowRightShort } from "react-icons/bs"
import styles from "./get.module.scss"
import icon1 from "../../../images/home/getstarted/icon1.svg"
import icon2 from "../../../images/home/getstarted/icon2.svg"
import icon3 from "../../../images/home/getstarted/icon3.svg"
import icon4 from "../../../images/home/getstarted/icon4.svg"

const card = [
  {
    icon: icon1,
    title: "I'm ready to start my new company!",
    subTitle: "I'm ready to register my company and make it official.",
  },
  {
    icon: icon2,
    title: "I need the right structure for my company.",
    subTitle:
      "I’m ready to start, but need help understanding the right structure for my new company.",
  },
  {
    icon: icon3,
    title: "I need help managing my state compliance.",
    subTitle:
      "I already have an official business (LLC, etc.), but need help managing my state compliance.",
  },
  {
    icon: icon4,
    title: "I need Registered Agent Service in US.",
    subTitle:
      "I would like to learn more about registered agents and why I need one.",
  },
]
function GetStarted() {
  return (
    <div className={styles.wrap}>
      <Container>
        <div className={styles.outer}>
          <h2 className={styles.heading}>How would you like to get started?</h2>
          <div className={styles.cardblock}>
            {card.map((value, i) => (
              <div
                key={value.title}
                className={`${styles.card} ${
                  i === 0
                    ? styles.card1
                    : i === 1
                    ? styles.card2
                    : i === 2
                    ? styles.card3
                    : i === 3
                    ? styles.card4
                    : ""
                } `}
              >
                <img src={value?.icon} alt="icons" />
                <div className={styles.textblock}>
                  <h3 className={styles.title}>{value?.title}</h3>
                  <p className={styles.subtitle}>{value?.subTitle}</p>
                </div>
                <div className={styles.arrowblock}>
                  <BsArrowRightShort className={styles.arrow} />
                </div>
              </div>
            ))}
          </div>
          <div className={styles.btnblock}>
            <Button className={styles.btn}>Start Your LLC Now</Button>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default GetStarted
