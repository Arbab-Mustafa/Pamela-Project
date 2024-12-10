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
                How Do I Know What Permits My Business Needs?
              </h2>
              <p className={styles.tagline}>
                Permits are an additional requirement for many businesses and
                are needed in the following circumstances
                <br />
                <ul>
                  <li>
                    Your LLC or corporation plans to serve alcohol or food
                  </li>
                  <li>
                    You will need to build or add a structure to your company's
                    building.
                  </li>
                  <li>
                    Your business is going to construct a building or structure
                    on new land.
                  </li>
                  <li>Your LLC plans to put up an exterior sign.</li>
                  <li>
                    You want to designate street parking for your business.
                  </li>
                  <li>Your industry is governed by a state association.</li>
                </ul>
                <br />
                This is not an exhaustive list by any means, therefore, working
                with Filthy Rich Idea to identify every situation is a key factor in
                starting your business off right.
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
