import React from "react"
import { Col, Container, Row } from "react-bootstrap"
import styles from "./need.module.scss"
import main from "../../../../images/services/amendment/article/main.webp"

function Need() {
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
                What Licenses Does My Business Need?
              </h2>
              <p className={styles.tagline}>
                There are two categories of business licenses, namely federal
                and state. This is just the first step in operating legally in
                both your jurisdiction and in the country.
                <br />
                <br />
                The federal government often requires a license to be obtained
                when you have a very specialized industry or one with a high
                level of liability. Some examples include serving alcohol,
                running a fishery, opening a gun shop, or transporting live
                animals across state lines.
                <br />
                <br />
                The state government always requires a license to operate within
                your particular locale and rules can differ based on whether
                your LLC or corporation is inside city limits or not. For
                example, you'll need to research whether you can have particular
                types of home businesses, especially when living in the city or
                a multi-family dwelling.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Need
