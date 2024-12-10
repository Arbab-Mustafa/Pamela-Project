import React from "react"
import HeroSection from "../../components/services/VirtualAddress/HeroSection"
import Article from "../../components/services/VirtualAddress/Articles"
import Need from "../../components/services/VirtualAddress/WhenDoNeed"
import GetAddress from "../../components/services/VirtualAddress/GetAddress"
import MoreInfo from "../../components/services/VirtualAddress/MoreInfo"

function VirtualAddress() {
  return (
    <div>
      <HeroSection />
      <Article />
      <Need />
      <GetAddress />
      <MoreInfo />
    </div>
  )
}

export default VirtualAddress
