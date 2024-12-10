import React from "react"
import { Col, Container, Row } from "react-bootstrap"
import styles from "./need.module.scss"
import main from "../../../../images/services/amendment/article/main.webp"

function Help() {
  return (
    <div className={styles.wrap}>
      <Container>
        <Row className={styles.row}>
          <Col lg={4}>
            <div className={styles.mainblock}>
              <img src={main} alt="main icon" className={styles.main} />
            </div>
          </Col>
          <Col lg={8}>
            <div className={styles.textblock}>
              <h2 className={styles.heading}>
                Need Help Filing Your LLC Annual Report?
              </h2>
              <p className={styles.tagline}>
                Save the stress and free up time while avoiding missed
                deadlines, state fines and the risk of dissolution. Let Filthy Rich Idea
                handle your paperwork.
                <br />
                <br />
                Place your order below and an Filthy Rich Idea representative will
                contact you to get the specific information required to complete
                and file the annual report in your state of formation.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Help
