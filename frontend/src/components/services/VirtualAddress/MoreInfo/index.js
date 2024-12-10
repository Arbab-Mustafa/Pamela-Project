import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import styles from "./moreinfo.module.scss"
import { ReactComponent as Info1 } from "../../../../images/services/virtualaddress/info1.svg"
import { ReactComponent as Info2 } from "../../../../images/services/virtualaddress/info2.svg"
import { ReactComponent as Info3 } from "../../../../images/services/virtualaddress/info3.svg"
import { ReactComponent as Info4 } from "../../../../images/services/virtualaddress/info4.svg"
import { ReactComponent as Info5 } from "../../../../images/services/virtualaddress/info5.svg"
import { ReactComponent as Info6 } from "../../../../images/services/virtualaddress/info6.svg"

const cardData = [
  {
    title: "Complete Mail Scanning of All Correspondence",
    content:
      "We digitally scan all letters and other correspondence, and then upload it to your secure account within one business day.",
    logo: <Info1 />,
    shadow: "rgba(231, 216, 162, 0.63) 0px 24px 32px 0px",
    background: "rgba(250, 239, 200, 1.0)",
  },
  {
    title: "Worldwide Access Via Web Browser",
    content:
      "There's no software to install; you can read your mail from anywhere and any web browser via our confidential online portal — just log in.",
    logo: <Info2 />,
    shadow: "rgba(166, 213, 233, 0.5) 0px 24px 32px 0px",
    background: "rgba(224, 244, 253, 1.0)",
  },
  {
    title: "Security and Encryption",
    content:
      "All of your correspondence is encrypted and available only to you. Physical data stays protected in our secure facilities.",
    logo: <Info3 />,
    shadow: "rgba(219, 202, 188, 0.5) 0px 24px 32px 0px",
    background: "rgba(252, 231, 208, 1.0)",
  },
  {
    title: "Email Notification",
    content:
      "We contact you every time we scan and upload a piece of mail, so you’ll never miss time-sensitive information.",
    logo: <Info4 />,
    shadow: "rgba(177, 190, 222, 0.5) 0px 24px 32px 0px",
    background: "rgba(210, 224, 254, 1.0)",
  },
  {
    title: "Mobile Compatibility",
    content:
      "View correspondence on your desktop, laptop, smartphone or tablet.",
    logo: <Info5 />,
    shadow: "rgba(199, 186, 213, 0.5) 0px 24px 32px 0px",
    background: "rgba(237, 224, 250, 1.0)",
  },
  {
    title: "No In-Person Access",
    content:
      "While we do provide you with a physical address to receive mail, this does not serve as a mail pickup location. We do not provide any in-person support.",
    logo: <Info6 />,
    shadow: "rgba(179, 219, 217, 0.5) 0px 24px 32px 0px",
    background: "rgba(213, 243, 232, 1.0)",
  },
]

function MoreInfo() {
  return (
    <div className={styles.moreInfoWrapper}>
      <div className={styles.moreInfoTitle}>
        More Information on Virtual Addresses
      </div>
      <p className={styles.moreInfoP}>
        Here’s everything else you need to know:
      </p>
      <Container className={styles.infoCardsWrapper}>
        <Row>
          {cardData.map((card) => (
            <Col lg={6}>
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
