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
                Why Is a Change of Registered Agent Needed?
              </h2>
              <p className={styles.tagline}>
                All businesses are required to designate a Registered Agent when
                registering.
                <br />
                <br />A Registered Agent (also known as statutory agent or
                resident agent) is an individual or a business who is chosen to
                be the official recipient of important legal documents on behalf
                of a business entity.
                <br />
                <br />
                Reasons that you might need a change of Registered Agent
                include:
              </p>
              <ul>
                <li>
                  In the formation rush, you designated yourself as your own
                  Registered Agent (which we don't typically recommend).
                </li>
                <li>You're expanding your business to another state.</li>
                <li>
                  Things aren't working out with your existing Registered Agent
                  service.
                </li>
                <li>
                  An individual acting as your Registered Agent is moving out of
                  state.
                </li>
              </ul>
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
