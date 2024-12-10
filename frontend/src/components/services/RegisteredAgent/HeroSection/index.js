import React from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import { useNavigate } from "react-router"
import { BsArrowRightShort } from "react-icons/bs"
import { useSelector } from "react-redux"
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
                Get Your Registered Agent Service Free for the First Year
              </h1>
              <h2 className={styles.tagline}>
                When You Form Your Business with Filthy Rich Idea Avoid the stress of
                managing your business’s documentation on your own by hiring a
                trustworthy and affordable Registered Agent.
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
