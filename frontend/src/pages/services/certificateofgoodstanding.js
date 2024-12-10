import React from "react"
import Article from "../../components/services/CertificateOfGood/Articles"
import HeroSection from "../../components/services/CertificateOfGood/HeroSection"
import Need from "../../components/services/CertificateOfGood/WhenDoNeed"
import ReduceWorkLoad from "../../components/services/CertificateOfGood/ReduceWorkLoad"
import FreeRegister from "../../components/services/CertificateOfGood/FreeRegister"
import FaqSection from "../../components/services/CertificateOfGood/FaqSection"
import Order from "../../components/services/CertificateOfGood/Order"

const CertificateOfGood = () => {
  return (
    <div>
      <HeroSection />
      <Article />
      <Need />
      <FreeRegister />
      <ReduceWorkLoad />
      <Order />
      <FaqSection />
    </div>
  )
}

export default CertificateOfGood
