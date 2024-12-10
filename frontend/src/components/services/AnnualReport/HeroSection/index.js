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
                File an Annual Report for Your LLC
              </h1>
              <p className={styles.tagline}>
                <b>
                  Filing an Annual Report Is Required by Your Secretary of State
                  — For All Business Entities
                </b>{" "}
                <br /> Lighten your workload and ensure your business stays
                compliant by letting Filthy Rich Idea handle your annual report filing.
              </p>
              <div className={styles.button}>
                <div className={styles.btnblock}>
                  <Button
                    className={styles.btn}
                    onClick={() =>
                      navigate(`${routes.ServiceForm}${selectedService._id}`)
                    }
                  >
                    Get Started
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
