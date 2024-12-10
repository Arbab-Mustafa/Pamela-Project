import React from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import Select from "react-select"
import { useSelector } from "react-redux"
import { BsArrowRightShort } from "react-icons/bs"
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
                Help File My Foreign Qualification
                <br />
                Save your time. We'll handle the paperwork.
              </h2>
              <h6>Typical criteria include but are not limited to:</h6>
              <ul>
                <li>Does the company have a physical presence in the state?</li>
                <li>Does the company conduct banking within state?</li>
                <li>
                  Does the entity have employees working within the state?
                </li>
              </ul>
              <h6>
                Requirements to obtain or a Foreign Qualification / Certificate
                of Authority:
              </h6>
              <ul>
                <li>
                  Must file appropriate state document and pay the corresponding
                  state fee.
                </li>
                <li>
                  Must obtain a Certificate of Good Standing from state of
                  origin to verify status of business formation.
                </li>
              </ul>
            </div>
          </Col>
          <Col lg={6} md={12}>
            <div className={styles.form}>
              <h3 className={styles.title}>Foreign Qualification</h3>
              <div className={styles.form1}>
                <p className={styles.subtitle}>Entity Type</p>
                <Select
                  options={entityOptions}
                  placeholder="Select Entity Type"
                  className="react-select-container"
                  classNamePrefix="react-select"
                  name="entity"
                />
              </div>
              <div className={styles.form2}>
                <p className={styles.subtitle}>Entity State</p>
                <Select
                  options={stateOptions}
                  placeholder="Select State"
                  className="react-select-container"
                  classNamePrefix="react-select"
                  name="state"
                />
              </div>
              <div className={styles.form2}>
                <p className={styles.subtitle}>
                  State of Foreign Qualification
                </p>
                <Select
                  options={stateOptions}
                  placeholder="Select State"
                  className="react-select-container"
                  classNamePrefix="react-select"
                  name="state"
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
