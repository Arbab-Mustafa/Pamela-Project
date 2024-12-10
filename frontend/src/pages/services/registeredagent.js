import React from "react"
import Article from "../../components/services/RegisteredAgent/Articles"
import HeroSection from "../../components/services/RegisteredAgent/HeroSection"
import Need from "../../components/services/RegisteredAgent/WhenDoNeed"
import ReduceWorkLoad from "../../components/services/RegisteredAgent/ReduceWorkLoad"
import FreeRegister from "../../components/services/RegisteredAgent/FreeRegister"
import FaqSection from "../../components/services/RegisteredAgent/FaqSection"
import RegisterNow from "../../components/services/RegisteredAgent/RegisterNow"

function RegisteredAgentPage() {
  return (
    <div>
      <HeroSection />
      <Article />
      <Need />
      <FreeRegister />
      <ReduceWorkLoad />
      <FaqSection />
      <RegisterNow />
    </div>
  )
}

export default RegisteredAgentPage
