import React from "react"
import HeroSection from "../../components/services/ForeignQualification/HeroSection"
import Need from "../../components/services/ForeignQualification/WhenDoNeed"
import FreeRegister from "../../components/services/ForeignQualification/FreeRegister"
import FaqSection from "../../components/services/ForeignQualification/FaqSection"
import FaqSectionForeign from "../../components/services/ForeignQualification/FaqSectionForeign"
import Order from "../../components/services/ForeignQualification/Order"

const ForeignQualification = () => {
  return (
    <div>
      <HeroSection />
      <Need />
      <FreeRegister />
      <FaqSection />
      <Order />
      <FaqSectionForeign />
    </div>
  )
}

export default ForeignQualification
