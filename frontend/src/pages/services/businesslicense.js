import React from "react"
import Article from "../../components/services/BusinessLicense/Articles"
import HeroSection from "../../components/services/BusinessLicense/HeroSection"
import Need from "../../components/services/BusinessLicense/WhenDoNeed"
import ReduceWorkLoad from "../../components/services/BusinessLicense/ReduceWorkLoad"
import FreeRegister from "../../components/services/BusinessLicense/FreeRegister"
import ResearchPackage from "../../components/services/BusinessLicense/ResearchPackage"
import ResearchLicense from "../../components/services/BusinessLicense/ResearchLicense"
import Order from "../../components/services/BusinessLicense/Order"

const BusinessLicense = () => {
  return (
    <div>
      <HeroSection />
      <Article />
      <Need />
      <FreeRegister />
      <ReduceWorkLoad />
      <ResearchPackage />
      <ResearchLicense />
      <Order />
    </div>
  )
}

export default BusinessLicense
