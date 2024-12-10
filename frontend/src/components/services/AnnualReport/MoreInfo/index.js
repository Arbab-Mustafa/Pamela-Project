import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import styles from "./moreinfo.module.scss"
import { ReactComponent as Tick } from "../../../../images/services/annualreport/tick.svg"

const cardData = [
  {
    title: "Exceptional Value for Your Money, Always",
    content:
      "No subscriptions, no recurring fees and no hidden costs. Clear, transparent pricing — every time.",
    logo: <Tick />,
    shadow: "0px 24px 32px rgb(236 236 236 / 50%);",
    background: "#97E0C7",
  },
  {
    title: "Enjoy a Superior and Modern User Experience",
    content:
      "File your annual report effortlessly. A carefully crafted experience makes entrepreneurship easy.",
    logo: <Tick />,
    shadow: "0px 24px 32px rgb(236 236 236 / 50%);",
    background: "#97E0C7",
  },
  {
    title: "Personalized, Industry-Leading Support",
    content: `24/7 fast and friendly customer service. Talk to a dedicated specialist, not a salesperson, whenever you need to.`,
    logo: <Tick />,
    shadow: "0px 24px 32px rgb(236 236 236 / 50%);",
    background: "#97E0C7",
  },
]

function MoreInfo() {
  return (
    <div className={styles.moreInfoWrapper}>
      <Container className={styles.infoCardsWrapper}>
        <div className={styles.moreInfoTitle}>
          Benefits of Filing Your Annual LLC Report with Filthy Rich Idea
        </div>
        <Row className="align-items-center justify-content-center mt-5">
          {cardData.map((card) => (
            <Col lg={10}>
              <div className={styles.infoCard}>
                <div
                  className={styles.infoCardLogoWrapper}
                  style={{
                    boxShadow: `${card.shadow}`,
                  }}
                >
                  <span
                    className={styles.infoCardLogo}
                    style={{ background: `${card.background}` }}
                  >
                    {card.logo}
                  </span>
                </div>
                <div className={styles.infoCardContent}>
                  <h4>{card.title}</h4>
                  <p>{card.content}</p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  )
}

export default MoreInfo
