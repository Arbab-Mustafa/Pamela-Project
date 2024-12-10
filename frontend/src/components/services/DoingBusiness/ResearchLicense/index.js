import React from "react"
import { Row, Col, Container } from "react-bootstrap"
import styles from "./research.module.scss"

const ResearchLicense = () => {
  return (
    <div className={styles.wrap}>
      <Container>
        <div className={styles.textblock}>
          <h2 className={styles.heading}>Other Terms for a DBA</h2>
          <p className={styles.tagline}>
            Whether you file a DBA yourself or work with us, you might also see
            DBA listed by a few other names, including:
          </p>
        </div>
        <Row className={styles.row}>
          <Col md={6} lg={4}>
            <div className={styles.licenseCard}>
              <div className={styles.licenseCardImg}>
                <span className={styles.iconTypeCheckmark}>
                  <svg
                    width="16"
                    height="12"
                    viewBox="0 0 16 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.4381 5.84069C2.13436 5.54028 1.6419 5.54028 1.33816 5.84069C1.03442 6.14109 1.03442 6.62814 1.33816 6.92854L5.22705 10.7747C5.53079 11.0751 6.02325 11.0751 6.32699 10.7747L14.8825 2.31316C15.1863 2.01276 15.1863 1.52571 14.8825 1.2253C14.5788 0.924899 14.0863 0.924899 13.7826 1.2253L5.77702 9.14291L2.4381 5.84069Z"
                      fill="white"
                      stroke="white"
                    />
                  </svg>
                </span>
              </div>
              <div className={styles.licenseCardContent}>
                Fictitious Business Name
              </div>
            </div>
          </Col>
          <Col md={6} lg={4}>
            <div className={styles.licenseCard}>
              <div className={styles.licenseCardImg}>
                <span className={styles.iconTypeCheckmark}>
                  <svg
                    width="16"
                    height="12"
                    viewBox="0 0 16 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.4381 5.84069C2.13436 5.54028 1.6419 5.54028 1.33816 5.84069C1.03442 6.14109 1.03442 6.62814 1.33816 6.92854L5.22705 10.7747C5.53079 11.0751 6.02325 11.0751 6.32699 10.7747L14.8825 2.31316C15.1863 2.01276 15.1863 1.52571 14.8825 1.2253C14.5788 0.924899 14.0863 0.924899 13.7826 1.2253L5.77702 9.14291L2.4381 5.84069Z"
                      fill="white"
                      stroke="white"
                    />
                  </svg>
                </span>
              </div>
              <div className={styles.licenseCardContent}>
                Assumed Business Name
              </div>
            </div>
          </Col>
          <Col md={6} lg={4}>
            <div className={styles.licenseCard}>
              <div className={styles.licenseCardImg}>
                <span className={styles.iconTypeCheckmark}>
                  <svg
                    width="16"
                    height="12"
                    viewBox="0 0 16 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.4381 5.84069C2.13436 5.54028 1.6419 5.54028 1.33816 5.84069C1.03442 6.14109 1.03442 6.62814 1.33816 6.92854L5.22705 10.7747C5.53079 11.0751 6.02325 11.0751 6.32699 10.7747L14.8825 2.31316C15.1863 2.01276 15.1863 1.52571 14.8825 1.2253C14.5788 0.924899 14.0863 0.924899 13.7826 1.2253L5.77702 9.14291L2.4381 5.84069Z"
                      fill="white"
                      stroke="white"
                    />
                  </svg>
                </span>
              </div>
              <div className={styles.licenseCardContent}>Trade Name</div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default ResearchLicense
