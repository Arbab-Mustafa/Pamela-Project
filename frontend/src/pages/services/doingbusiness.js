import React from "react"
import Article from "../../components/services/DoingBusiness/Articles"
import HeroSection from "../../components/services/DoingBusiness/HeroSection"
import Need from "../../components/services/DoingBusiness/WhenDoNeed"
import ReduceWorkLoad from "../../components/services/DoingBusiness/ReduceWorkLoad"
import FreeRegister from "../../components/services/DoingBusiness/FreeRegister"
import DbaVsLlc from "../../components/services/DoingBusiness/DbaVsLlc"
import ResearchLicense from "../../components/services/DoingBusiness/ResearchLicense"
import FaqSection from "../../components/services/DoingBusiness/FaqSection"
import RegisterNow from "../../components/services/DoingBusiness/RegisterNow"

const DoingBusiness = () => {
  return (
    <div>
      <HeroSection />
      <Article />
      <Need />
      <ResearchLicense />
      <FreeRegister />
      <ReduceWorkLoad />
      <DbaVsLlc />
      <FaqSection />
      <RegisterNow />
    </div>
  )
}

export default DoingBusiness
