import React from "react"
import styles from "./faqSection.module.scss"
import Faqs from "../Faqs"

function FaqSection() {
  return (
    <div className={styles.faqSectionWrapper}>
      <div className={styles.faqsHeading}>
        <h2>Common Questions About Filing a Change of Registered Agent</h2>
      </div>
      <div className={styles.faqsAccordionWrapper}>
        <Faqs
          key={1}
          heading="How Much Does It Cost to File a Change of Agent?"
        >
          <p>
            Our service fee to change the agent is $49. You'll also need to pay
            the state fee, which varies based on where your business was formed.
            To review the fee in your state click on the “order now” button and
            select the state and entity type.
          </p>
        </Faqs>
        <Faqs key={2} heading="Are There Any Hidden Costs?">
          <p>
            No! We pride ourselves on transparency. There are absolutely no
            hidden costs associated with you changing your Registered Agent.
          </p>
        </Faqs>
        <Faqs key={3} heading="Are There Specific Rules for My State?">
          <p>
            You’ll always need to fill out a “Change of Registered Agent” form,
            but the processing fee and the information needed varies by state -
            which is why it pays to work with Filthy Rich Idea. Check out everything you
            need to know about Registered Agents and make sure to explore your
            state’s specific information.
          </p>
        </Faqs>
        <Faqs
          key={4}
          heading="How Long Does it Take to File for a Change of Agent?"
        >
          <p>In some states, you can complete it in as little as an hour.</p>
        </Faqs>
      </div>
    </div>
  )
}

export default FaqSection
