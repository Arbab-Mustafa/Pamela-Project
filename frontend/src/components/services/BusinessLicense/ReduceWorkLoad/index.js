import React from "react"
import { Col, Container, Row } from "react-bootstrap"
import styles from "./need.module.scss"
import main from "../../../../images/services/amendment/need/main.png"

function ReduceWorkLoad() {
  return (
    <div className={styles.wrap}>
      <Container>
        <Row className={styles.row}>
          <Col lg={5}>
            <div className={styles.mainblock}>
              <img src={main} alt="main icon" className={styles.main} />
            </div>
          </Col>
          <Col lg={7}>
            <div className={styles.textblock}>
              <h2 className={styles.heading}>
                How Do I Apply For A Business License?
              </h2>
              <p className={styles.tagline}>
                <ul>
                  <li>
                    You'll need to get a license for a small fee to operate a
                    business at the address of location.
                  </li>
                  <li>
                    Next, your company will need an Assumed Name under which to
                    register, or you can incorporate your business and use your
                    formal name.
                  </li>
                  <li>
                    Then, if you operate from home or plan to remodel a space,
                    for example, you'll need to obtain permits to do so. Other
                    permits covering serving alcohol, displaying a sign on the
                    building exterior and even parking for your business might
                    also be a requirement. A great place to research your local
                    zoning and operating laws is the nearest Small Business
                    Development Center (SBDC).
                  </li>
                  <li>
                    Finally, a business must register with the state tax office
                    and submit appropriate taxes on the schedule indicated by
                    your secretary of state.
                  </li>
                </ul>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default ReduceWorkLoad
