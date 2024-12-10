import React from "react"
import Article from "../../components/services/ChangeRegisteredAgent/Articles"
import HeroSection from "../../components/services/ChangeRegisteredAgent/HeroSection"
import Need from "../../components/services/ChangeRegisteredAgent/WhenDoNeed"
import ReduceWorkLoad from "../../components/services/ChangeRegisteredAgent/ReduceWorkLoad"
import FreeRegister from "../../components/services/ChangeRegisteredAgent/FreeRegister"
import FaqSection from "../../components/services/ChangeRegisteredAgent/FaqSection"
import RegisterNow from "../../components/services/ChangeRegisteredAgent/RegisterNow"
import ChangeAgent from "../../components/services/ChangeRegisteredAgent/ChangeAgent"

const ChangeRegisteredAgent = () => {
  return (
    <div>
      <HeroSection />
      <Article />
      <Need />
      <FreeRegister />
      <ReduceWorkLoad />
      <ChangeAgent />
      <FaqSection />
      <RegisterNow />
    </div>
  )
}

export default ChangeRegisteredAgent
