import React from "react"
import HeroSection from "../../components/services/CompanyDissolution/HeroSection"
import Article from "../../components/services/CompanyDissolution/Articles"
import Need from "../../components/services/CompanyDissolution/WhenDoNeed"
import MoreInfo from "../../components/services/CompanyDissolution/MoreInfo"
import Order from "../../components/services/CompanyDissolution/Order"
import FaqSection from "../../components/services/CompanyDissolution/FaqSection"

const CompanyDissolution = () => {
  return (
    <div>
      <HeroSection />
      <Article />
      <Need />
      <MoreInfo />
      <Order />
      <FaqSection />
    </div>
  )
}

export default CompanyDissolution
