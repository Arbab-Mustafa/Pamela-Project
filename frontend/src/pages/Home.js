import React from "react"
import BusinessFormation from "../components/home/BusinessFormation"
import GetStarted from "../components/home/GetStarted"
import HeroSection from "../components/home/HeroSection"
import WhyChoose from "../components/home/WhyChoose"

function Home() {
  return (
    <div>
      <HeroSection />
      <GetStarted />
      <BusinessFormation />
      <WhyChoose />
    </div>
  )
}

export default Home
