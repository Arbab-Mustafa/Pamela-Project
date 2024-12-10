import React from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import { BsArrowRightShort } from "react-icons/bs"
import einFile from "../../../../images/services/ein/ein-file.webp"
import styles from "./easy.module.scss"

function EINOrder() {
  return (
    <div className={styles.wrap}>
      <Container>
        <Row className={styles.row}>
          <Col lg={6} md={12}>
            <div className={styles.textblock}>
              <h2 className={styles.heading}>
                Help Obtain a EIN / Tax ID Number
              </h2>
              <p className={styles.tagline}>
                Save your time. We'll handle the paperwork.
                <br />
                <br />
                If you would like to use our services to facilitate the filing
                of your Tax ID / EIN please place the order and a representative
                from Filthy Rich Idea will contact you to obtain specific information
                required to complete and file the Tax ID / EIN in your state of
                formation.
              </p>
            </div>
          </Col>
          <Col lg={6} md={12}>
            <div className={styles.form}>
              <h3 className={styles.title}>TAX ID / EIN</h3>
              <img className="mx-auto" src={einFile} alt="" />
              <h4 className={styles.tagline}>$74</h4>
              <div className={styles.button}>
                <div className={styles.btnblock}>
                  <Button className={styles.btn}>
                    Order Now
                    <BsArrowRightShort className={styles.icon} />
                  </Button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default EINOrder
