import React from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { BsArrowRightShort } from "react-icons/bs"
import styles from "./hero.module.scss"
import main from "../../../../images/services/amendment/herosection/main.webp"
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
              <h1 className={styles.heading}>File Articles of Amendment</h1>
              <h2 className={styles.tagline}>
                Here’s how to change your LLC’s name, address or member
                information.
              </h2>
              <div className={styles.button}>
                <div className={styles.btnblock}>
                  <Button
                    className={styles.btn}
                    onClick={() =>
                      navigate(`${routes.ServiceForm}${selectedService._id}`)
                    }
                  >
                    File Article of Amendment
                  </Button>
                  <BsArrowRightShort className={styles.icon} />
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
