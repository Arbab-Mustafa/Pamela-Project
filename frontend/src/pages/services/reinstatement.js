import React from "react"
import HeroSection from "../../components/services/Reinstatement/HeroSection"
import Article from "../../components/services/Reinstatement/Articles"
import Need from "../../components/services/Reinstatement/WhenDoNeed"
import MoreInfo from "../../components/services/Reinstatement/MoreInfo"
import Order from "../../components/services/Reinstatement/Order"
import FaqSection from "../../components/services/Reinstatement/FaqSection"

const Reinstatement = () => {
  return (
    <div>
      {" "}
      <HeroSection />
      <Article />
      <Need />
      <MoreInfo />
      <Order />
      <FaqSection />
    </div>
  )
}

export default Reinstatement
