import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import styles from "./moreinfo.module.scss"
import { ReactComponent as Info3 } from "../../../../images/services/virtualaddress/info3.svg"
import { ReactComponent as Info5 } from "../../../../images/services/virtualaddress/info5.svg"
import { ReactComponent as Info6 } from "../../../../images/services/virtualaddress/info6.svg"

const cardData = [
  {
    title: "Get back in business faster",
    content:
      "In many states, reinstatement procedures can be completed in less time than forming a new company, meaning you can restart operations sooner.",
    logo: <Info5 />,
    shadow: "rgba(231, 216, 162, 0.63) 0px 24px 32px 0px",
    background: "rgba(250, 239, 200, 1.0)",
  },
  {
    title: "Keep your company name",
    content:
      "You put a lot of effort into choosing the perfect business name — don’t throw it away! Reinstatement allows you to continue to use your original brand.",
    logo: <Info6 />,
    shadow: "rgba(166, 213, 233, 0.5) 0px 24px 32px 0px",
    background: "rgba(224, 244, 253, 1.0)",
  },
  {
    title: "Recover historical company information",
    content: `With reinstatement, you can keep your original records and maintain your historical background. No starting from scratch!`,
    logo: <Info3 />,
    shadow: "rgba(219, 202, 188, 0.5) 0px 24px 32px 0px",
    background: "rgba(252, 231, 208, 1.0)",
  },
]

function MoreInfo() {
  return (
    <div className={styles.moreInfoWrapper}>
      <Container className={styles.infoCardsWrapper}>
        <div className={styles.moreInfoTitle}>Why Choose Reinstatement?</div>
        <p className={styles.moreInfoP}>
          In addition to costing significantly less, there are many advantages
          to choosing Reinstatement over forming a completely new company.
        </p>
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
