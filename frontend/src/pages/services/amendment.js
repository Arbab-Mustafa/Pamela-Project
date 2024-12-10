import React from "react"
import Article from "../../components/services/Amendment/Articles"
import FilingEasy from "../../components/services/Amendment/FilingEasy"
import HeroSection from "../../components/services/Amendment/HeroSection"
import Need from "../../components/services/Amendment/WhenDoNeed"

function Amendment() {
  return (
    <div>
      <HeroSection />
      <Article />
      <Need />
      <FilingEasy />
    </div>
  )
}

export default Amendment
