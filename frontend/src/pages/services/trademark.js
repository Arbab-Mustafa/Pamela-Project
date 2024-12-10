import React from "react"
import HeroSection from "../../components/services/Trademark/HeroSection"
import Need from "../../components/services/Trademark/WhenDoNeed"
import ResearchLicense from "../../components/services/Trademark/ResearchLicense"
import Order from "../../components/services/Trademark/Order"
import FaqSection from "../../components/services/Trademark/FaqSection"

const Trademark = () => {
  return (
    <div>
      <HeroSection />
      <Need />
      <ResearchLicense />
      <Order />
      <FaqSection />
    </div>
  )
}

export default Trademark
