import React from "react"
import Article from "../../components/services/EmployerIdentification/Articles"
import HeroSection from "../../components/services/EmployerIdentification/HeroSection"
import Need from "../../components/services/EmployerIdentification/WhenDoNeed"
import ReduceWorkLoad from "../../components/services/EmployerIdentification/ReduceWorkLoad"
import FreeRegister from "../../components/services/EmployerIdentification/FreeRegister"
import FaqSection from "../../components/services/EmployerIdentification/FaqSection"
import EINOrder from "../../components/services/EmployerIdentification/EINOrder"

function EmployerIdentification() {
  return (
    <div>
      <HeroSection />
      <Article />
      <Need />
      <FreeRegister />
      <ReduceWorkLoad />
      <EINOrder />
      <FaqSection />
    </div>
  )
}

export default EmployerIdentification
