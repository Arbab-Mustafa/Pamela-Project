import React from "react"
import { Col, Container, Row } from "react-bootstrap"
import styles from "./article.module.scss"
import main from "../../../../images/services/amendment/article/main.webp"
function Article() {
  return (
    <div className={styles.wrap}>
      <Container>
        <Row className={styles.row}>
          <Col lg={7}>
            <div className={styles.textblock}>
              <h2 className={styles.heading}>Why Dissolve your company?</h2>
              <p className={styles.tagline}>
                A corporation or LLC can come to a place of dissolution for
                several reasons. It can simply be a decision you've made for
                your company because it is no longer successful, you are moving
                on to a new adventure or your shareholders wish to dissolve its
                assets. This will, fortunately, stop the necessary tax filings
                and other requirements that come with having a record of
                operation on file with the secretary of state. But, the
                emotional decision to dissolve your company can be tough at
                times, if you put your heart and sweat into building your own
                business.
                <br />
                <br />
                <b>
                  Allow Filthy Rich Idea.com to ease the burden by doing the dissolution
                  paperwork for you.
                </b>
              </p>
            </div>
          </Col>
          <Col lg={5}>
            <div className={styles.mainblock}>
              <img src={main} alt="main icon" className={styles.main} />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Article
