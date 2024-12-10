import React from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import { useNavigate } from "react-router"
import { useSelector } from "react-redux"
import { BsArrowRightShort } from "react-icons/bs"
import styles from "./hero.module.scss"
import main from "../../../../images/services/registeragent/registerHero.webp"
import { routes } from "../../../../routes"

function HeroSection() {
  const navigate = useNavigate()
  const selectedService = useSelector((state) => state.common.selectedService)

  return (
    <div className={styles.wrap}>
      <Container>
        <Row className={styles.row}>
          <Col lg={5}>
            <div className={styles.textblock}>
              <h1 className={styles.heading}>
                Business License Research Package
              </h1>
              <h2 className={styles.tagline}>Only $99</h2>
              <div className={styles.button}>
                <div className={styles.btnblock}>
                  <Button
                    className={styles.btn}
                    onClick={() =>
                      navigate(`${routes.ServiceForm}${selectedService._id}`)
                    }
                  >
                    Get started
                    <BsArrowRightShort className={styles.icon} />
                  </Button>
                </div>
              </div>
            </div>
          </Col>
          <Col lg={7}>
            <div className={styles.mainicon}>
              <img src={main} alt="main icon" className={styles.main} />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default HeroSection
