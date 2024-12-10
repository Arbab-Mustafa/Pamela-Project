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
                Need Help Filing Your Change of Registered Agent?
              </h2>
              <p className={styles.tagline}>
                To change <b>Registered Agents</b>, you must first complete and
                submit a change of Registered Agent filing.
                <br />
                <br />
                This filing will allow you to stop using your current Registered
                Agent service and elect a new Registered Agent.
                <br />
                <br />
                Do you need someone to change your Registered Agent for you? Or
                would you like someone to file the change and then provide
                Registered Agent service going forward?
                <br />
                <br />
                Either way, you can save time and stress by letting Filthy Rich Idea
                manage the agent change paperwork for you.
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
