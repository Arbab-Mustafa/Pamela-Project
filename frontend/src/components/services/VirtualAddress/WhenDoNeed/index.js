import React from "react"
import { Col, Container, Row } from "react-bootstrap"
import styles from "./need.module.scss"
import main from "../../../../images/services/amendment/article/main.webp"
import { ReactComponent as RightArrow } from "../../../../images/services/virtualaddress/country-arrow.svg"

const countries = [
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Delaware",
  "Florida",
  "Georgia",
  "Idaho",
  "Illinois",
  "Indiana",
  "Massachusetts",
  "Missouri",
  "Nevada",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "Ohio",
  "Pennsylvania",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Virginia",
  "Washington",
  "Wisconsin",
  "Wyoming",
]
function Need() {
  return (
    <div className={styles.wrap}>
      <Container>
        <Row className={styles.row}>
          <Col lg={6}>
            <div className={styles.mainblock}>
              <img src={main} alt="main icon" className={styles.main} />
            </div>
          </Col>
          <Col lg={6}>
            <div className={styles.textblock}>
              <h2 className={styles.heading}>
                States Where Virtual Address Service Is Available
              </h2>
              <p className={styles.tagline}>
                Filthy Rich Idea currently provides virtual mailboxes in 27 different
                states across the country, providing you with the flexibility
                you need to run your business in the location that makes the
                most sense for you.
              </p>
              <div className={styles.countriesWrapper}>
                {countries.map((country) => (
                  <div className={styles.virtualCountry}>
                    <RightArrow className="me-1" /> {country}
                  </div>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Need
