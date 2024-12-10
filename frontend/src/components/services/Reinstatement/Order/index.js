import React from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import { BsArrowRightShort } from "react-icons/bs"
// import { useSelector } from "react-redux"
import styles from "./easy.module.scss"
import einFile from "../../../../images/services/ein/ein-file.webp"

function Order() {
  // const statesRed = useSelector((state) => state?.common?.state)
  // const stateOptions = statesRed?.map((value) => {
  //   return {
  //     value: value?.value,
  //     label: value?.name,
  //     price: value?.price,
  //     id: value?.id,
  //     parentName: "State",
  //   }
  // })
  return (
    <div className={styles.wrap}>
      <Container>
        <Row className={styles.row}>
          <Col lg={7}>
            <div className={styles.textblock}>
              <h2 className={styles.heading}>Ready to Get Reinstated?</h2>
              <p className={styles.tagline}>
                Filthy Rich Idea can help you reinstate your dissolved business and get
                back in good standing.
              </p>
            </div>
          </Col>
          <Col lg={5}>
            <div className={styles.form}>
              <h3 className={styles.title}>Get Reinstated</h3>
              <img className="mx-auto mb-2" src={einFile} alt="" />
              <div className={styles.button}>
                <div className={styles.btnblock}>
                  <Button className={styles.btn}>
                    File Your Reinstatement
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

export default Order
