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
              <h2 className={styles.heading}>Why File a DBA with Filthy Rich Idea?</h2>
              <p className={styles.tagline}>
                Our DBA package offers four key benefits that business owners
                should pay attention to.
                <br />
                <ul>
                  <li>
                    <b>Location-Specific Branding</b>
                    <br />A DBA for each location your business operates in
                    allows them to hold distinctly separate names under the same
                    umbrella company (for example, “Cassidy’s Cookies New York”
                    and Cassidy’s Cookies LA”).
                  </li>
                  <li>
                    <b>Product Flexibility</b>
                    <br />
                    Say you’re a jack-of-all-trades and run many businesses all
                    under your name. Use multiple DBAs to clarify what your
                    product offerings are (for example, “Cassidy’s Cookies” and
                    “Cassidy’s Cakes”).
                  </li>
                  <li>
                    <b>Streamlined Rebranding</b>
                    <br />
                    Maybe you registered your LLC under a name that doesn’t
                    quite fit your vibe anymore. Target your audience better by
                    creating a DBA that aligns more with your new branding as
                    your company evolves (rather than forming a new LLC).
                  </li>
                  <li>
                    <b>Privacy</b>
                    <br />
                    When you form a business, it automatically takes on the name
                    of the business owner unless you file as a certain legal
                    entity (like an LLC or S or C Corporation). A DBA allows you
                    to legally separate your name from your business’s name so
                    you can maintain privacy.
                  </li>
                </ul>
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
