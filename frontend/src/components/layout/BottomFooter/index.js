import React from "react"
import { Container } from "react-bootstrap"
import styles from "./bottomfooter.module.scss"
import instagram from "../../../images/home/footer/instagram.png"
import facebook from "../../../images/home/footer/facebook.svg"
import youtube from "../../../images/home/footer/youtube.svg"
import linkedin from "../../../images/home/footer/linkedin.svg"

function BottomFooter() {
  const socialLinks = [
    {
      name: "facebook",
      img: facebook,
      link: " https://www.facebook.com/FilthyRichIdea/",
    },
    {
      name: "youtube",
      img: youtube,
      link: " https://www.youtube.com/channel/UCIoxPaBh9Pp4ioYiZsBLgAQ",
    },
    {
      name: "linkedin",
      img: linkedin,
      link: " https://www.linkedin.com/company/filthy-rich-idea",
    },
    {
      name: "instagram",
      img: instagram,
      link: " https://www.instagram.com/filthyrichidea/",
    },
    {
      name: "Twitter ",
      img: facebook,
      link: "https://twitter.com/filthyrichidea",
    },
  ]
  return (
    <div className={styles.wrap}>
      <Container>
        <div className={styles.outer}>
          <div className={styles.copyright}>
            <p>© 2024 . Filthy Rich Idea.com All Rights Reserved.</p>
          </div>
          <div className={styles.iconblock}>
            {socialLinks?.map((e, i) => (
              <a href={e?.link} key={i} target="_blank" rel="noreferrer">
                <img
                  src={e?.img}
                  alt={e?.name}
                  className={e?.name === "instagram" ? `${styles.icon}` : " "}
                />
              </a>
            ))}
          </div>
        </div>
      </Container>
    </div>
  )
}

export default BottomFooter
