import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import styles from "./moreinfo.module.scss"
// import { ReactComponent as Info1 } from "../../../../images/services/virtualaddress/info1.svg"
// import { ReactComponent as Info2 } from "../../../../images/services/virtualaddress/info2.svg"
// import { ReactComponent as Info3 } from "../../../../images/services/virtualaddress/info3.svg"
// import { ReactComponent as Info4 } from "../../../../images/services/virtualaddress/info4.svg"
// import { ReactComponent as Info5 } from "../../../../images/services/virtualaddress/info5.svg"
// import { ReactComponent as Info6 } from "../../../../images/services/virtualaddress/info6.svg"

const cardData = [
  {
    title: "Hold a meeting with the Board of Directors",
    content:
      "In this case, you want the minutes of your meeting to reflect that a vote was taken and appropriate majority (as outlined in your incorporation papers) was achieved. Those companies with shareholders will want a written documentation of this decision signed by all company owners. Some companies, such as single-member LLCs will not need to complete this step.",
    logo: "1",
    shadow: "rgba(231, 216, 162, 0.63) 0px 24px 32px 0px",
    background: "rgba(250, 239, 200, 1.0)",
  },
  {
    title: "File the Articles of Dissolution",
    content:
      "The paperwork must be completed and signed by the Registered Agent of your company. You will be issued a Certificate of Dissolution that formalizes the termination of business activity in your state. Once dissolution is properly documented, all branches in other states will automatically be dissolved as well. The dissolution of a company must take place in the state where incorporation took place.",
    logo: "2",
    shadow: "rgba(166, 213, 233, 0.5) 0px 24px 32px 0px",
    background: "rgba(224, 244, 253, 1.0)",
  },
  {
    title: "Notify the IRS",
    content: `This step is important because it will provide you with a "consent to dissolution" or "tax clearance" that makes the process a smooth one. It will be necessary to pay all federal and state taxes due at this time to receive this consent. This document(s) will be required by the secretary of state to achieve a formal dissolution. While we'll help you file your Articles of Dissolution, you will be responsible for contacting the IRS to receive any tax clearances, etc.`,
    logo: "3",
    shadow: "rgba(219, 202, 188, 0.5) 0px 24px 32px 0px",
    background: "rgba(252, 231, 208, 1.0)",
  },
]

function MoreInfo() {
  return (
    <div className={styles.moreInfoWrapper}>
      <Container className={styles.infoCardsWrapper}>
        <div className={styles.moreInfoTitle}>
          Steps to Dissolving Your LLC or Corporation
        </div>
        <p className={styles.moreInfoP}>
          There are three key steps to dissolving a company. Filthy Rich Idea completes
          these steps in a timely manner on your behalf, making an otherwise
          cumbersome process simple and stress-free.
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
