import React from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import { BsArrowRightShort } from "react-icons/bs"
import { useSelector } from "react-redux"
import Select from "react-select"
import { entityOptions } from "../../../../utils/helpers"
import styles from "./easy.module.scss"

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
          <Col lg={6} md={12}>
            <div className={styles.textblock}>
              <h2 className={styles.heading}>
                Get Your Certificate of Good Standing Now
              </h2>
              <p className={styles.tagline}>
                The Certificate of Good Standing helps you prove that you are a
                law-abiding business owner who complies with the rules. It helps
                enhance your trustworthiness and credibility with potential
                partners, investors and lenders.
                <br />
                <br />
                Obtaining a Certificate of Good Standing is a simple but
                sometimes necessary step in maintaining your business’s good
                reputation and branching out your business operations into new
                areas.
              </p>
            </div>
          </Col>
          <Col lg={6} md={12}>
            <div className={styles.form}>
              <h3 className={styles.title}>Amendment</h3>
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
