import React from "react"
import { Col, Container, Row } from "react-bootstrap"
import styles from "./need.module.scss"
import main from "../../../../images/services/amendment/need/main.png"

function ReduceWorkLoad() {
  return (
    <div className={styles.wrap}>
      <Container>
        <Row className={styles.row}>
          <Col lg={5}>
            <div className={styles.mainblock}>
              <img src={main} alt="main icon" className={styles.main} />
            </div>
          </Col>
          <Col lg={7}>
            <div className={styles.textblock}>
              <h2 className={styles.heading}>How to File a DBA</h2>
              <p className={styles.tagline}>
                Filing a DBA is a multi-step process. While you could try to
                tackle the following yourself — why add more work to your plate?
                <ul>
                  <li>
                    <b>Find Out What Entity Controls Business Formation</b>{" "}
                    <br />
                    Usually this is the Secretary of State. However, sometimes
                    this is done at the county level. If that’s the case, make
                    sure you register your DBA in each county you operate in.
                  </li>
                  <li>
                    <b>Download, Fill Out and Send the Online Form</b> <br />
                    Visit the relevant website and find the section on DBA,
                    trade, fictitious or assumed names. With any luck, you’ll be
                    able to do this digitally - although some systems are
                    woefully outdated and require faxing or mailing.
                  </li>
                  <li>
                    <b>Pay the Filing Fee</b> <br />
                    Filing fees vary by state and depend on whether you’re
                    registering for an LLC, corporation or other entity.
                  </li>
                  <li>
                    <b>Ensure Your Business Name Is Protected</b> <br />A DBA by
                    itself won’t protect your business name. Forming an LLC or
                    corporation is one of the best ways to secure the legal name
                    of your business, but if you want to take an extra step, it
                    may be worth trademarking your business name. We can help
                    with that. Our low-cost Trademark Search and Registration
                    service makes it easy to protect your DBA.
                  </li>
                  <li>
                    <b>File Your Taxes</b> <br />
                    Whether or not you have a DBA, you’ll need to file taxes.
                    The method and frequency of this depend on your business
                    structure.
                  </li>
                </ul>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default ReduceWorkLoad
