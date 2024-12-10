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
                Do I Need a Certificate of Good Standing?
              </h2>
              <p className={styles.tagline}>
                In certain situations, you may be required to prove that your
                business exists and is in compliance with relevant laws and
                regulations. A Certificate of Good Standing from your state
                serves as this proof.
                <br />
                <br />
                Different authorities may require a Certificate of Good
                Standing, including:
                <br />
                <br />
                <b>Other state governments:</b> as part of the process of
                applying for Foreign Qualification for your business to register
                to do business in states other than your home state
                <br />
                <br />
                <b>Lenders or banks:</b> that want to get proof of your
                business’s existence and business history as part of evaluating
                your creditworthiness for a loan or when carrying out certain
                types of transactions
                <br />
                <br />
                <b>Investors or business partners:</b> who want to make sure
                your business is legitimate and in compliance with laws and
                regulations
                <br />
                <br />
                <b>More capital:</b> C Corps are typically much more attractive
                to potential investors, like venture capitalists and
                shareholders, because this type of business structure allows for
                wider ownership of the corporation.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Need
