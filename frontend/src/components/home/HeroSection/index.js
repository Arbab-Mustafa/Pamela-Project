import React from "react"
import { useNavigate } from "react-router"
import { Button, Col, Container, Row } from "react-bootstrap"
import { BsArrowRightShort } from "react-icons/bs"
import styles from "./hero.module.scss"
import main from "../../../images/home/herosection/main.webp"
import icon1 from "../../../images/home/herosection/icon1.svg"
import icon2 from "../../../images/home/herosection/icon2.svg"
import star from "../../../images/home/herosection/star.svg"
import { routes } from "../../../routes"

function HeroSection() {
  const navigate = useNavigate()
  return (
    <div className={styles.wrap}>
      <Container>
        <Row className={styles.row}>
          <Col lg={5}>
            <div className={styles.textblock}>
              <h1 className={styles.heading}>
                The Easiest Way to Set Up and Manage Your Business
              </h1>
              <h2 className={styles.tagline}>
                Join Over <span className={styles.tagline2}>800,000</span>{" "}
                Businesses Owners with Filthy Rich Idea Since{" "}
                <span className={styles.tagline3}>2004</span>
              </h2>
              <div className={styles.button}>
                <Button
                  className={styles.btnblock}
                  onClick={() => navigate(routes.formOrderNow)}
                >
                  Start My Business
                  <BsArrowRightShort className={styles.icon} />
                </Button>
              </div>
              <div className={styles.ratingblock}>
                <div className={styles.icon1block}>
                  <img src={icon1} alt="icon" className={styles.icon1} />
                </div>
                {/* <div className={styles.textblock}>
                  <p className={styles.title}>More trusted, Verified Reviews</p>
                  <div className={styles.starblock}>
                    <img src={star} alt="star icon" />
                    <img src={star} alt="star icon" />
                    <img src={star} alt="star icon" />
                    <img src={star} alt="star icon" />
                    <img src={star} alt="star icon" />
                    <p className={styles.subtitle}>37,810 ratings</p>
                  </div>
                </div> */}
                <div className={styles.icon2block}>
                  <img src={icon2} alt="icon" className={styles.icon2} />
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
