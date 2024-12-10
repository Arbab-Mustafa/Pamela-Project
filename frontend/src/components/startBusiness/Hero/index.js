import React from "react"
import { Col, Container, Row } from "react-bootstrap"
import Select from "react-select"
import { useSelector } from "react-redux"
import styles from "./hero.module.scss"
import icon1 from "../../../images/home/herosection/icon1.svg"
import star from "../../../images/home/herosection/star.svg"
import { bigEntityOptions } from "../../../utils/helpers"

function HeroSection({ formik }) {
  const statesRed = useSelector((state) => state?.common?.state)
  console.log("States Data from Redux:", statesRed)

  const stateOptions = statesRed?.map((value) => {
    return {
      value: value?.value,
      label: value?.name,
      price: value?.price,
      id: value?.id,
      parentName: "State",
    }
  })
  console.log("State Options:", stateOptions)

  return (
    <div className={styles.wrap}>
      <Container>
        <Row className={styles.row}>
          <Col>
            <div className={styles.textblock}>
              <h1 className={styles.heading}>
                Get Your Business Started Today
              </h1>
              <h2 className={styles.tagline}>
                Select your entity type and state to get package prices.
              </h2>
              <div className={styles.formSelectsWrapper}>
                <div className={styles.formSelect}>
                  <Select
                    options={bigEntityOptions}
                    placeholder="Select Entity Type"
                    className="react-select-container"
                    classNamePrefix="react-select"
                    value={formik.values.entityType}
                    onChange={(e) => {
                      formik.setValues({
                        ...formik.values,
                        entityType: e,
                      })
                    }}
                  />
                  <span className="error-message">
                    {formik.errors.entityType?.value}
                  </span>
                </div>
                <div className={styles.formSelect}>
                  <Select
                    options={stateOptions}
                    placeholder="Select State"
                    className="react-select-container"
                    classNamePrefix="react-select"
                    value={formik.values.state}
                    onChange={(e) => {
                      formik.setValues({
                        ...formik.values,
                        state: e,
                      })
                    }}
                  />
                  <span className="error-message">
                    {formik.errors.state?.value}
                  </span>
                </div>
              </div>
              <div className={styles.ratingblock}>
                <div className={styles.icon1block}>
                  <img src={icon1} alt="icon" className={styles.icon1} />
                </div>
                <div className={styles.textblock}>
                  <p className={styles.title}>More trusted, Verified Reviews</p>
                  <div className={styles.starblock}>
                    <img src={star} alt="star icon" />
                    <img src={star} alt="star icon" />
                    <img src={star} alt="star icon" />
                    <img src={star} alt="star icon" />
                    <img src={star} alt="star icon" />
                    <p className={styles.subtitle}>37,810 ratings</p>
                  </div>
                </div>
              </div>
              <h2 className={styles.stateTagline}>
                Package pricing will display below.
              </h2>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default HeroSection
