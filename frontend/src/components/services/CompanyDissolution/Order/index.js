import React from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import { BsArrowRightShort } from "react-icons/bs"
import { useSelector } from "react-redux"
import Select from "react-select"
import styles from "./easy.module.scss"
import { entityOptions } from "../../../../utils/helpers"

function Order() {
  const statesRed = useSelector((state) => state?.common?.state)
  const stateOptions = statesRed?.map((value) => {
    return {
      value: value?.value,
      label: value?.name,
      price: value?.price,
      id: value?.id,
      parentName: "State",
    }
  })
  return (
    <div className={styles.wrap}>
      <Container>
        <Row className={styles.row}>
          <Col lg={7}>
            <div className={styles.textblock}>
              <h2 className={styles.heading}>
                Save your time. We'll handle the paperwork.
              </h2>
              <p className={styles.tagline}>
                <b>Requirements to file Articles of Dissolution:</b>
                <br />
                <br />
                The company must be in good standing with the state of
                incorporation and cannot be in arrears of franchise taxes or
                annual reporting requirements. In the event that the entity is
                not in good standing reinstatement would be required in order to
                proceed with the dissolution.
              </p>
            </div>
          </Col>
          <Col lg={5}>
            <div className={styles.form}>
              <h3 className={styles.title}>Dissolution</h3>
              <div className={styles.form1}>
                <p className={styles.subtitle}>Entity Type</p>
                <Select
                  options={entityOptions}
                  placeholder="Select Entity Type"
                  className="react-select-container"
                  classNamePrefix="react-select"
                />
              </div>
              <div className={styles.form2}>
                <p className={styles.subtitle}>Entity State</p>
                <Select
                  options={stateOptions}
                  placeholder="Select State"
                  className="react-select-container"
                  classNamePrefix="react-select"
                />
              </div>
              <h4 className={styles.tagline}>$80</h4>
              <p className={styles.tagline2}>Plus State Filing Fees</p>
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

export default Order
