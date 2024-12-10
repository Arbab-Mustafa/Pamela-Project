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
              <h2 className={styles.heading}>What is a Business License?</h2>
              <p className={styles.tagline}>
                A business license authorizes a company to "do business" in a
                certain geographical jurisdiction. It is a certificate that
                authenticates your company is properly registered with the
                particular county or city in which your office(s) are located.
                <br />
                <br />
                When you apply for a business license, keep in mind that there
                are instances with certain types of businesses and certain
                locations that require additional paperwork for permits. We
                discuss both the types of licenses and permits below. If you'd
                like to research your license and permit requirements yourself,
                you can get started with Filthy Rich Idea's Business License Search Tool,
                which will tell you the basic requirements for your state and
                industry.
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
