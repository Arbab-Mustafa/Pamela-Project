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
                Need to Change Your Registered Agent?
              </h1>
              <h2 className={styles.tagline}>
                Changing Your Registered Agent Is Easier, Simpler & Quicker with
                Filthy Rich Idea Sometimes circumstances arise that require a Registered
                Agent change. Let Filthy Rich Idea save you time and handle the
                paperwork.
              </h2>
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
              <div className={styles.review}>
                <div className={styles.custom}>
                  <p className={styles.text}>800K+</p>
                </div>
                <p className={styles.text2}>
                  Join the <span className={styles.text3}>800,000+</span>{" "}
                  businesses that have chosen
                  <span className={styles.text4}> Filthy Rich Idea</span> .
                </p>
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
