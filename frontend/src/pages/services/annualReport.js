import React from "react"
import HeroSection from "../../components/services/AnnualReport/HeroSection"
import Article from "../../components/services/AnnualReport/Articles"
import Need from "../../components/services/AnnualReport/WhenDoNeed"
import Purpose from "../../components/services/AnnualReport/Purpose"
import Help from "../../components/services/AnnualReport/Help"
import MoreInfo from "../../components/services/AnnualReport/MoreInfo"
import FaqSection from "../../components/services/AnnualReport/FaqSection"

const AnnualReport = () => {
  return (
    <div>
      <HeroSection />
      <Article />
      <Need />
      <Purpose />
      <Help />
      <MoreInfo />
      <FaqSection />
    </div>
  )
}

export default AnnualReport
