import React from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { Button, Col, Container, Row } from "react-bootstrap"
import { BsArrowRightShort } from "react-icons/bs"
import styles from "./hero.module.scss"
import main from "../../../../images/services/registeragent/registerHero.webp"
import icon1 from "../../../../images/home/herosection/icon1.svg"
import star from "../../../../images/home/herosection/star.svg"
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
                Virtual Address - Virtual Mailbox and Mail Scanning Service from
                Filthy Rich Idea
              </h1>
              <h2 className={styles.tagline}>
                Get a Fixed Street Address and Access to Your Correspondence
                Anywhere
              </h2>
              <div className={styles.button}>
                <div className={styles.btnblock}>
                  <Button
                    className={styles.btn}
                    onClick={() =>
                      navigate(`${routes.ServiceForm}${selectedService._id}`)
                    }
                  >
                    View Where Available
                    <BsArrowRightShort className={styles.icon} />
                  </Button>
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
