import React from "react"
import { Col, Container, Row } from "react-bootstrap"
import styles from "./article.module.scss"
import main from "../../../../images/services/amendment/article/main.webp"
function Article() {
  return (
    <div className={styles.wrap}>
      <Container>
        <Row className={styles.row}>
          <Col lg={7}>
            <div className={styles.textblock}>
              <h2 className={styles.heading}>
                Does My Business Need a Registered Agent?
              </h2>
              <p className={styles.tagline}>
                Yes. Every LLC, corporation and nonprofit is required to have an
                official Registered Agent (sometimes called a statutory agent,
                resident agent or agent for service of process) in each state
                where it does business.
                <br />
                <br />A Registered Agent serves as a permanent physical presence
                in the state, and the Registered Agent address is where the
                state government can contact you with legal and tax
                correspondence, including franchise tax forms, notices of
                litigation and required annual report forms. Learn more about
                Registered Agents and why you need one here.
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

export default Article
